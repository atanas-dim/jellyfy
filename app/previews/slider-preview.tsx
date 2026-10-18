const SliderPreview = () => (
  <label className="jellyfy-slider">
    Volume
    <span className="jellyfy-slider-box">
      <span className="jellyfy-slider-track">
        <span className="jellyfy-slider-fill" />
      </span>
      <span className="jellyfy-slider-handle" />
      <input type="range" defaultValue={62} />
    </span>
  </label>
);

export default SliderPreview;
