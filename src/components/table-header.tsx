const TableHeader = () => (
  <>
    {/* Mobile header (3 columns) */}
    <div className="grid md:hidden grid-cols-[48px_1fr_auto] gap-3 items-baseline lg:items-center mb-2 pb-2 px-3">
      <div className="text-light-gray font-semibold text-sm uppercase tracking-wider" />
      <div className="text-light-gray font-semibold text-sm uppercase tracking-wider">
        Player
      </div>
      <div className="flex flex-col items-end">
        <div className="text-light-gray font-semibold text-sm uppercase tracking-wider">
          Reaction Time
        </div>
        <div className="text-light-gray text-xs uppercase tracking-wider">
          AVG: 253<span className="lowercase">ms</span>
        </div>
      </div>
    </div>

    {/* Desktop header */}
    <div className="hidden md:grid grid-cols-[80px_1fr_200px_140px] gap-4 items-center mb-2 pb-3 px-2">
      <div className="text-light-gray font-semibold text-lg uppercase tracking-wider" />
      <div className="text-light-gray font-semibold text-lg uppercase tracking-wider">
        PLAYER NAME
      </div>
      <div className="text-light-gray font-semibold text-lg uppercase tracking-wider">
        REACTION TIME
      </div>
      <div className="text-light-gray font-semibold text-lg uppercase tracking-wider">
        AVG: 253<span className="lowercase">ms</span>
      </div>
    </div>
  </>
);

export default TableHeader;