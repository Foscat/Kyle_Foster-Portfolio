import { faCopy } from "@fortawesome/free-solid-svg-icons";
import useClipboard from "assets/hooks";

const CopyButton = ({ txt }) => {
  const { copy, copied } = useClipboard();

  return (
    <Btn
      onClick={() => copy(txt)}
      text={copied ? "Copied!" : "Copy"}
      icon={faCopy}
    />
  );
};

export default CopyButton;
