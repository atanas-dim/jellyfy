const SelectPreview = () => (
  <label className="jellyfy-select">
    <select defaultValue="mint">
      <option value="mint">Mint</option>
      <option value="rose">Rose</option>
    </select>
    <span>Flavor</span>
    <i className="jellyfy-chevron" />
  </label>
);

export default SelectPreview;
