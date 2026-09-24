// Selo da Kyvo (kyvo.dev.br/selo.js), usado no rodapé
import "react";

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "kyvo-selo": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        "data-tema"?: "escuro" | "claro";
        "data-alinhar"?: "esquerda" | "centro" | "direita";
      };
    }
  }
}
