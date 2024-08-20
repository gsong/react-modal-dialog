import { useState } from "react";

import { TestModal } from "../components/TestModal";

export default function Test() {
  const [isDismissed, setIsDismissed] = useState(false);

  console.debug("isDismissed", isDismissed);

  return (
    <>
      <h1>Test allowDismiss</h1>
      {isDismissed ? <div>Dismissed</div> : null}
      <TestModal allowDismiss onDismiss={() => setIsDismissed(true)} />
    </>
  );
}
