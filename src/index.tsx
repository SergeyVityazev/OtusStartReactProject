import React from "react";
import { render } from "react-dom";

import { ClickCounter } from "./ClickCounter";

render(<ClickCounter start={5} />, document.getElementById("root"));
