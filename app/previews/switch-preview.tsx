const SwitchPreview = () => (
  <label className="toggle">
    <input type="checkbox" role="switch" defaultChecked />
    <span className="toggle-track">
      <span className="toggle-thumb" />
    </span>
    Notifications
  </label>
);

export default SwitchPreview;
