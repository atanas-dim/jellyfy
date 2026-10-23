import { InfoIcon } from "lucide-react";

const AlertPreview = () => (
  <div className="alert warning">
    <InfoIcon aria-hidden="true" />
    <div>
      <p className="font-semibold">Check the date</p>
      <p>This offer ends tonight.</p>
    </div>
  </div>
);

export default AlertPreview;
