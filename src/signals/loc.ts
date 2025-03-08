import { getLocation } from "@lib/RequestLocation.ts";
import xurl from "./url.ts";

export default xurl.compute((x) => getLocation(new Request(x.href)))
