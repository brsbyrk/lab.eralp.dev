/* eslint-disable no-eval */
/** @jsx jsx */
import { jsx, Box, Input, Button, Link } from "theme-ui";
import raw from "raw.macro";
import SourceCode from "../../components/source-code";
import {
  FunctionComponent,
  Fragment,
  useEffect,
  useState,
  FormEvent
} from "react";
import useScript from "../../utils/use-script";
import useEventListener from "../../utils/user-event-listener";
import githubSourceUrl from "../../file-github-source-url.macro";

const pythonScript = raw("./script.py");
const brythonInitScript = raw("./bythonInit.js");
const currentFileSource = raw("./index.tsx");

const Brython: FunctionComponent = () => {
  const [alertString, setAlertString] = useState<string>("Hello from Python");
  const [brythonReady, setBrythonReady] = useState<boolean>(false);
  useScript({ src: "/Brython-3.8.7/brython.js" });
  useScript({ src: "/Brython-3.8.7/brython_stdlib.js" });
  useScript({ text: pythonScript, type: "text/python" });
  useEventListener("BRYTHON_READY", () => setBrythonReady(true));
  useEffect(() => eval(brythonInitScript), []);
  const handleOnSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    eval(`document.brython_alert("${encodeURIComponent(alertString)}")`);
  };
  return (
    <Fragment>
      <h1>Brython</h1>
      <p>
        Demo of <Link href="https://brython.info/">Brython</Link> the Python 3
        implementation for client-side web programming. Try changing the text
        below and clicking the button. You should see an alert with the entered
        text.
      </p>

      <Box>
        {(brythonReady && (
          <form
            sx={{ height: 42 }}
            onSubmit={handleOnSubmit}
            css={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <Input
              sx={{ mr: 2 }}
              type="text"
              name="name"
              value={alertString}
              onChange={e => setAlertString(e.target.value)}
            />
            <Button type="submit">Run</Button>
          </form>
        )) || (
          <p sx={{ color: "primary" }}>Python Runtime Is Getting Ready...</p>
        )}
      </Box>

      <p>
        This is the python code that gets injected into document in a script
        tag. Note that we add a function to the document. We will call this
        later from javascript.
      </p>
      <SourceCode language="python" code={pythonScript} />
      <p>
        And this is how Brython is initilized from a react component.
        "useScript" is a utility that creates a script tag in document body
      </p>
      <SourceCode
        language={"typescript"}
        code={currentFileSource}
        lineNumbersEnabled
        lineRange={[24, 27]}
      />
      <p>
        The evaluated "brythonInitScript" simply sets a loop to check until
        Brython loads then initilizes it;
      </p>
      <SourceCode language="javascript" code={brythonInitScript} />
      <p>
        When python code runs, it dispatches BRYTHON_READY event to let the
        react know. Then the input and button is rendered. Once the button is
        clicked we call the function added by python code. Python takes the text
        we put as an argument, uses it to the trigger the alert.
      </p>
      <SourceCode
        language={"tsx"}
        code={currentFileSource}
        lineNumbersEnabled
        lineRange={[29, 32]}
      />
      <p>
        Here's the <Link href={githubSourceUrl}>full source code</Link> of this
        experiment
      </p>
    </Fragment>
  );
};

export default Brython;
