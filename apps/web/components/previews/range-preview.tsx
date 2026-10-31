const RangePreview = () => (
  <label className="range">
    Volume
    <span className="range-box">
      <span className="range-track">
        <span className="range-fill" />
      </span>
      <span className="range-thumb" />
      <input type="range" defaultValue={62} />
    </span>
  </label>
);

export default RangePreview;
