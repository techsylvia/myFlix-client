import React, { useEffect, useState } from "react";

// export class BobComponent extends React.Component {
//   constructor() {
//     super();
//     // code executed right when the component is created in the memory, happens before "rendering" the component
//   }

//   render() {
//     return <div>Hello World</div>;
//   }
// }

export function BobComponent() {
  const [bob, setBob] = useState("syl");

  useEffect(() => {
    setBob("bobby");
  });

  return (
    <>
      <div>Hello Bob</div>;{bob}
    </>
  );
}
