import useClipboard from "assets/hooks";
import Btn from "components/Btn";

const CopyButton = ({ txt }) => {
  const { copy, copied } = useClipboard();

  return (
    <Btn
      onClick={() => copy(txt)}
      text={copied ? "Copied!" : "Copy"}
      icon="copy"
    />
  );
};
