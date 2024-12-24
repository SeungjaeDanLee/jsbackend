import http from "k6/http";

// test option
export const options = {
    vus: 100,
    duration: "10s",
};

// test scenario
export default function() {
    http.get("http://localhost:8000");
}