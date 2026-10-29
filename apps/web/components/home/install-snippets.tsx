import { CodeBlock } from "@/components/code-block";

export const InstallSnippets = () => (
  <>
    <CodeBlock
      className="code-wrap mt-0"
      lang="bash"
      code="npm install jellyfy"
    />
    <CodeBlock
      className="code-wrap mt-0"
      lang="css"
      code={`@import "jellyfy/jellyfy.css";`}
    />
    <CodeBlock
      className="code-wrap mt-0"
      lang="js"
      code={`import { startJellyfy } from "jellyfy";

startJellyfy();`}
    />
  </>
);
