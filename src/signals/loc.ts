import { getLocation } from "@utils/RequestLocation.ts";
import { xurl } from "@signals";

export default xurl.compute((x) => getLocation(new Request(x.href)))
