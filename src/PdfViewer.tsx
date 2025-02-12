import { useEffect, useRef } from "react";
import PSPDFKit, { Instance } from "pspdfkit";

export function PDFViewer() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const pdfInstanceRef = useRef<Instance | "init" | "pending">("init");

  useEffect(() => {
    (async () => {
      if (containerRef.current && pdfInstanceRef.current === "init") {
        pdfInstanceRef.current = "pending";
        pdfInstanceRef.current = await PSPDFKit.load({
          container: containerRef.current,
          document: "why-functional-programming.pdf",
          baseUrl: `${window.location.protocol}//${window.location.host}/`,
          inlineWorkers: false,
        });
      }
    })();

    return () => {
      if (
        pdfInstanceRef.current !== "init" &&
        pdfInstanceRef.current !== "pending"
      ) {
        PSPDFKit.unload(containerRef.current!);
      }
    };
  }, []);

  return (
    <div
      className="pdf-viewer"
      ref={containerRef}
      style={{ height: "100vh" }}
    />
  );
}
