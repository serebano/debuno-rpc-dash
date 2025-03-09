import { computed } from "@preact/signals";
import { origins, files, type Meta } from "@signals";

export default computed<Meta>(() => ({
    origins: origins.value,
    files: files.value
}));