import { renderToReadableStream } from "react-dom/server";
import { StaticRouter } from "react-router";
import { MotionConfig } from "motion/react";
import { Portfolio } from "./app/App";
import { routeMetadata } from "./app/routeMetadata";

export async function render(pathname: string) {
  const stream = await renderToReadableStream(
    <StaticRouter location={pathname}>
      <MotionConfig reducedMotion="always">
        <Portfolio />
      </MotionConfig>
    </StaticRouter>,
  );
  await stream.allReady;
  return {
    html: await new Response(stream).text(),
    metadata: routeMetadata(pathname),
  };
}
