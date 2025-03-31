import hljs from "https://esm.sh/highlight.js@11.11.1/lib/core";
import typescript from "https://esm.sh/highlight.js@11.11.1/lib/languages/typescript";
import javascript from "https://esm.sh/highlight.js@11.11.1/lib/languages/javascript";
import css from "https://esm.sh/highlight.js@11.11.1/lib/languages/css";
import json from "https://esm.sh/highlight.js@11.11.1/lib/languages/json";
import plaintext from "https://esm.sh/highlight.js@11.11.1/lib/languages/plaintext";
import xml from "https://esm.sh/highlight.js@11.11.1/lib/languages/xml";
import bash from "https://esm.sh/highlight.js@11.11.1/lib/languages/bash";
import markdown from "https://esm.sh/highlight.js@11.11.1/lib/languages/markdown";

// Then register the languages you need
hljs.registerLanguage('ts', typescript);
hljs.registerLanguage('tsx', typescript);
hljs.registerLanguage('d.ts', typescript);

hljs.registerLanguage('js', javascript);
hljs.registerLanguage('jsx', javascript);

hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('typescript', typescript);

hljs.registerLanguage('json', json);
hljs.registerLanguage('xml', xml);
hljs.registerLanguage('html', xml);
hljs.registerLanguage('css', css);
hljs.registerLanguage('txt', plaintext as any);
hljs.registerLanguage('sh', bash as any);
hljs.registerLanguage('md', markdown);

