/** Decorative skeleton standing in for a real project screenshot. */
export function ProjectPreview({ accent }: { accent: string }) {
  return (
    <div
      aria-hidden="true"
      className="aspect-[16/10] w-full overflow-hidden rounded-t-[10px] bg-white shadow-[0_1px_2px_rgba(0,0,0,0.06),0_0_0_0.5px_rgba(0,0,0,0.04)] select-none"
    >
      <div className="flex items-center gap-[14px] border-b border-[#f0f0f0] px-[16px] py-[13px]">
        <div className="h-[8px] w-[42px] rounded-full bg-[#e2e2e2]" />
        <div className="flex gap-[8px]">
          <div className="h-[8px] w-[34px] rounded-full bg-[#ededed]" />
          <div className="h-[8px] w-[28px] rounded-full bg-[#ededed]" />
          <div className="h-[8px] w-[30px] rounded-full bg-[#ededed]" />
        </div>
        <div
          className="ml-auto h-[14px] w-[14px] rounded-[4px]"
          style={{ backgroundColor: accent }}
        />
      </div>
      <div className="grid grid-cols-3 gap-[10px] p-[16px]">
        {Array.from({ length: 6 }, (_, index) => (
          <div
            key={index}
            className="rounded-[8px] border border-[#f0f0f0] p-[10px]"
          >
            <div className="flex items-center gap-[8px]">
              <div
                className="h-[16px] w-[16px] shrink-0 rounded-[5px]"
                style={{ backgroundColor: accent }}
              />
              <div className="flex flex-1 flex-col gap-[4px]">
                <div className="h-[6px] w-[70%] rounded-full bg-[#e4e4e4]" />
                <div className="h-[5px] w-[45%] rounded-full bg-[#efefef]" />
              </div>
            </div>
            <div className="mt-[10px] flex flex-col gap-[4px]">
              <div className="h-[5px] w-full rounded-full bg-[#f1f1f1]" />
              <div className="h-[5px] w-[85%] rounded-full bg-[#f1f1f1]" />
            </div>
            <div className="mt-[10px] h-[3px] w-full rounded-full bg-[#ebebeb]">
              <div
                className="h-full w-[70%] rounded-full"
                style={{ backgroundColor: accent }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
