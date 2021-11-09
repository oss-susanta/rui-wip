import React, { lazy, Suspense } from "react";
import Loading from "../components/Loading";

export default function Lazy(fn) {
  const Component = lazy(fn);
  function LazyComponent(props) {
    return (
      <Suspense fallback={<Loading />}>
        <Component {...props} />
      </Suspense>
    );
  }
  return LazyComponent;
}
