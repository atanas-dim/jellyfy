const SelectPreview = () => (
  <label className="select">
    <select defaultValue="mint">
      <option value="mint">Mint</option>
      <option value="rose">Rose</option>
    </select>
    <span>Flavor</span>
    <i className="picker-icon" />
  </label>
);

export default SelectPreview;
