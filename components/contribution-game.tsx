"use client";

import { useCallback, useEffect, useRef, type RefObject } from "react";

const LEVEL_HEX_COLORS = [
  "#ebebeb",
  "#b0b0b0",
  "#757575",
  "#404040",
  "#141414",
];

const MOVE_SPEED = 5.5;
const BULLET_SPEED = 9.5;
const FIRE_RATE_MS = 160;
const TOUCH_FIRE_INTERVAL_MS = 140;
const SHIP_MARGIN = 16;
const SHIP_PARTICLES = 14;
const NOMINAL_FRAME_MS = 1000 / 60;
const MAX_FRAME_MS = 50;
const CANVAS_CLASS =
  "pointer-events-none absolute -top-2 left-0 z-20 h-[calc(100%+70px)] w-full";

function clampShipX(x: number, max: number) {
  return Math.max(SHIP_MARGIN, Math.min(max, x));
}

type Bullet = {
  x: number;
  y: number;
};

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
  decay: number;
  gravity: number;
};

type CollisionCell = {
  date: string;
  level: number;
  left: number;
  right: number;
  top: number;
  bottom: number;
  centerX: number;
  centerY: number;
  destroyed: boolean;
};

type CollisionColumn = {
  left: number;
  right: number;
  cells: CollisionCell[];
};

function PixelSpaceship({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 13 8"
      className={className}
      fill="currentColor"
      shapeRendering="crispEdges"
    >
      <rect x="6" y="0" width="1" height="1" />
      <rect x="5" y="1" width="3" height="1" />
      <rect x="5" y="2" width="3" height="1" />
      <rect x="4" y="3" width="5" height="1" />
      <rect x="0" y="4" width="13" height="1" />
      <rect x="0" y="5" width="13" height="1" />
      <rect x="0" y="6" width="2" height="1" />
      <rect x="4" y="6" width="5" height="1" />
      <rect x="11" y="6" width="2" height="1" />
      <rect x="0" y="7" width="1" height="1" />
      <rect x="5" y="7" width="3" height="1" />
      <rect x="12" y="7" width="1" height="1" />
    </svg>
  );
}

type ContributionGameProps = {
  containerRef: RefObject<HTMLDivElement | null>;
  gridRef: RefObject<HTMLDivElement | null>;
  destroyedDates: Set<string>;
  onHit: (dates: string[]) => void;
  onExit: () => void;
};

export function ContributionGame({
  containerRef,
  gridRef,
  destroyedDates,
  onHit,
  onExit,
}: ContributionGameProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const shipRef = useRef<HTMLDivElement>(null);

  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const canvasSizeRef = useRef({ w: 0, h: 0 });
  const shipXRef = useRef(0);
  const shipMaxXRef = useRef(0);
  const bulletsRef = useRef<Bullet[]>([]);
  const particlesRef = useRef<Particle[]>([]);
  const keysRef = useRef({ left: false, right: false });
  const lastShotRef = useRef(0);
  const columnsRef = useRef<CollisionColumn[]>([]);
  const colStepRef = useRef(0);
  const animIdRef = useRef(0);

  const touchStartXRef = useRef(0);
  const touchShipStartXRef = useRef(0);
  const autoFireRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const onHitRef = useRef(onHit);
  const onExitRef = useRef(onExit);
  const destroyedDatesRef = useRef(destroyedDates);

  useEffect(() => {
    onHitRef.current = onHit;
    onExitRef.current = onExit;
    destroyedDatesRef.current = destroyedDates;
  });

  function setShipPosition(x: number) {
    shipXRef.current = x;
    if (shipRef.current) {
      shipRef.current.style.transform = `translateX(-50%) translateX(${x}px)`;
    }
  }

  const refreshGeometry = useCallback(() => {
    const grid = gridRef.current;
    const canvas = canvasRef.current;
    if (!grid || !canvas) return;

    const dpr = window.devicePixelRatio || 1;
    const cssW = canvas.clientWidth;
    const cssH = canvas.clientHeight;
    canvasSizeRef.current = { w: cssW, h: cssH };

    const backingW = Math.max(1, Math.round(cssW * dpr));
    const backingH = Math.max(1, Math.round(cssH * dpr));
    if (canvas.width !== backingW || canvas.height !== backingH) {
      canvas.width = backingW;
      canvas.height = backingH;
    }

    const ctx = ctxRef.current;
    if (ctx) {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 8 * dpr);
    }

    shipMaxXRef.current = Math.max(
      SHIP_MARGIN * 2,
      grid.clientWidth - SHIP_MARGIN
    );

    const gridRect = grid.getBoundingClientRect();
    const cellEls = grid.querySelectorAll<HTMLElement>("[data-contrib-date]");
    const columns: CollisionColumn[] = [];
    let current: CollisionColumn | null = null;

    for (let i = 0; i < cellEls.length; i++) {
      const el = cellEls[i];
      const date = el.dataset.contribDate;
      if (!date) continue;
      const rect = el.getBoundingClientRect();
      const left = rect.left - gridRect.left;
      const right = left + rect.width;
      const top = rect.top - gridRect.top;
      const bottom = top + rect.height;

      if (!current || left !== current.left) {
        current = { left, right, cells: [] };
        columns.push(current);
      }

      current.cells.push({
        date,
        level: Number(el.dataset.contribLevel ?? 0),
        left,
        right,
        top,
        bottom,
        centerX: left + rect.width / 2,
        centerY: top + rect.height / 2,
        destroyed: destroyedDatesRef.current.has(date),
      });
    }

    columnsRef.current = columns;
    colStepRef.current =
      columns.length > 1 ? columns[1].left - columns[0].left : 0;
  }, [gridRef, canvasRef]);

  useEffect(() => {
    const grid = gridRef.current;
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!grid || !container || !canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctxRef.current = ctx;

    const bullets = bulletsRef.current;
    const particles = particlesRef.current;
    const keys = keysRef.current;

    setShipPosition(Math.max(SHIP_MARGIN, Math.floor(grid.clientWidth / 2)));
    const bulletSpawnY = grid.clientHeight + 16;

    function shoot() {
      const now = performance.now();
      if (now - lastShotRef.current < FIRE_RATE_MS) return;
      lastShotRef.current = now;
      const columns = columnsRef.current;
      let bulletX = shipXRef.current;
      if (columns.length > 0 && colStepRef.current > 0) {
        const colIndex = Math.round(
          (bulletX - columns[0].left) / colStepRef.current
        );
        const clamped = Math.max(0, Math.min(columns.length - 1, colIndex));
        const column = columns[clamped];
        bulletX = column.left + (column.right - column.left) / 2;
      }
      bullets.push({ x: bulletX, y: bulletSpawnY });
    }

    function spawnParticles(cell: CollisionCell) {
      const color = LEVEL_HEX_COLORS[cell.level] ?? "#141414";
      for (let p = 0; p < SHIP_PARTICLES; p++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 4.5 + 1.5;
        particles.push({
          x: cell.centerX,
          y: cell.centerY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 1.2,
          size: Math.random() * 3 + 2,
          color,
          alpha: 1,
          decay: Math.random() * 0.025 + 0.015,
          gravity: 0.12,
        });
      }
    }

    refreshGeometry();
    const resizeObserver = new ResizeObserver(() => refreshGeometry());
    resizeObserver.observe(grid);
    const handleWindowResize = () => refreshGeometry();
    window.addEventListener("resize", handleWindowResize);
    window.addEventListener("orientationchange", handleWindowResize);

    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key;
      if (key === "a" || key === "A" || key === "ArrowLeft") {
        keys.left = true;
      } else if (key === "d" || key === "D" || key === "ArrowRight") {
        keys.right = true;
      } else if (
        key === " " ||
        key === "Spacebar" ||
        key === "w" ||
        key === "W" ||
        key === "ArrowUp"
      ) {
        e.preventDefault();
        shoot();
      } else if (key === "Escape") {
        onExitRef.current();
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === "a" || e.key === "A" || e.key === "ArrowLeft") {
        keys.left = false;
      } else if (e.key === "d" || e.key === "D" || e.key === "ArrowRight") {
        keys.right = false;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    const handleTouchStart = (e: TouchEvent) => {
      e.preventDefault();
      const touch = e.touches[0];
      touchStartXRef.current = touch.clientX;
      touchShipStartXRef.current = shipXRef.current;
      shoot();
      if (!autoFireRef.current) {
        autoFireRef.current = setInterval(() => shoot(), TOUCH_FIRE_INTERVAL_MS);
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      const touch = e.touches[0];
      const dx = touch.clientX - touchStartXRef.current;
      setShipPosition(
        clampShipX(touchShipStartXRef.current + dx, shipMaxXRef.current),
      );
    };

    const handleTouchEnd = () => {
      if (autoFireRef.current) {
        clearInterval(autoFireRef.current);
        autoFireRef.current = null;
      }
    };

    container.addEventListener("touchstart", handleTouchStart, { passive: false });
    container.addEventListener("touchmove", handleTouchMove, { passive: false });
    container.addEventListener("touchend", handleTouchEnd);
    container.addEventListener("touchcancel", handleTouchEnd);

    let lastTime = performance.now();
    const loop = (now: number) => {
      animIdRef.current = requestAnimationFrame(loop);

      const delta = Math.min(now - lastTime, MAX_FRAME_MS);
      lastTime = now;
      const frameScale = delta / NOMINAL_FRAME_MS;

      if (keys.left) {
        setShipPosition(
          Math.max(SHIP_MARGIN, shipXRef.current - MOVE_SPEED * frameScale),
        );
      }
      if (keys.right) {
        setShipPosition(
          Math.min(
            shipMaxXRef.current,
            shipXRef.current + MOVE_SPEED * frameScale,
          ),
        );
      }

      const ctx2 = ctxRef.current;
      if (!ctx2) return;

      const size = canvasSizeRef.current;
      ctx2.clearRect(0, 0, size.w, size.h);

      const hitDates: string[] = [];
      let write = 0;

      const columns = columnsRef.current;

      for (let i = 0; i < bullets.length; i++) {
        const bullet = bullets[i];
        bullet.y -= BULLET_SPEED * frameScale;

        ctx2.fillStyle = "#141414";
        ctx2.shadowColor = "#141414";
        ctx2.shadowBlur = 4;
        ctx2.fillRect(bullet.x - 1.5, bullet.y, 3, 10);
        ctx2.shadowBlur = 0;

        let hit = false;

        if (columns.length > 0) {
          let colIndex = 0;
          if (columns.length > 1) {
            const step = colStepRef.current;
            if (step > 0) {
              colIndex = Math.round((bullet.x - columns[0].left) / step);
            }
          }

          for (
            let ci = Math.max(0, colIndex - 1);
            ci <= Math.min(columns.length - 1, colIndex + 1);
            ci++
          ) {
            const column = columns[ci];
            if (bullet.x < column.left || bullet.x > column.right) continue;

            const cells = column.cells;
            for (let c = 0; c < cells.length; c++) {
              const cell = cells[c];
              if (cell.destroyed) continue;
              if (bullet.y >= cell.top && bullet.y <= cell.bottom) {
                hit = true;
                cell.destroyed = true;
                hitDates.push(cell.date);
                spawnParticles(cell);
                break;
              }
            }
            if (hit) break;
          }
        }

        if (!hit && bullet.y > -20) {
          bullets[write++] = bullet;
        }
      }
      bullets.length = write;

      if (hitDates.length > 0) {
        onHitRef.current(hitDates);
      }

      let particleWrite = 0;
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += p.gravity;
        p.alpha -= p.decay;

        if (p.alpha > 0) {
          ctx2.globalAlpha = Math.max(0, p.alpha);
          ctx2.fillStyle = p.color;
          ctx2.fillRect(p.x - p.size / 2, p.y - p.size / 2, p.size, p.size);
          particles[particleWrite++] = p;
        }
      }
      particles.length = particleWrite;
      ctx2.globalAlpha = 1;
    };

    animIdRef.current = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animIdRef.current);
      if (autoFireRef.current) {
        clearInterval(autoFireRef.current);
        autoFireRef.current = null;
      }
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      window.removeEventListener("resize", handleWindowResize);
      window.removeEventListener("orientationchange", handleWindowResize);
      container.removeEventListener("touchstart", handleTouchStart);
      container.removeEventListener("touchmove", handleTouchMove);
      container.removeEventListener("touchend", handleTouchEnd);
      container.removeEventListener("touchcancel", handleTouchEnd);
      resizeObserver.disconnect();
      keys.left = false;
      keys.right = false;
      bullets.length = 0;
      particles.length = 0;
      columnsRef.current.length = 0;
      ctxRef.current = null;
    };
  }, [containerRef, gridRef, refreshGeometry]);

  return (
    <>
      <canvas
        ref={canvasRef}
        className={CANVAS_CLASS}
      />
      <div
        ref={shipRef}
        className="absolute z-30 select-none"
        style={{ bottom: "-42px", left: 0, transform: "translateX(-50%)" }}
      >
        <div className="flex flex-col items-center">
          <PixelSpaceship className="h-[18px] w-[28px] text-[#141414] drop-shadow-[0_2px_4px_rgba(0,0,0,0.15)]" />
          <div className="mt-[2px] h-[4px] w-[6px] animate-pulse rounded-full bg-[#383838]" />
        </div>
      </div>
    </>
  );
}
