import ReactGA from "react-ga4";

export function recordProductSelection() {
    ReactGA.event({
        category: "product_selected",
        action: "product_selected"
    })
}