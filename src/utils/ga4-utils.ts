import ReactGA from "react-ga4";
import {Profile} from "@/app/page";

export function recordProductSelection(product: string) {
    ReactGA.event("product_selected", {product: product});
}

export function recordGTaSubProductSelection(subProduct: string) {
    ReactGA.event("sub_product_selected", {subProduct: subProduct});
}

export function recordDurationSelection(duration: string) {
    ReactGA.event("duration_selected", {duration: duration});
}

export function recordRegionSelection(region: string) {
    ReactGA.event("region_selected", {region: region});
}

export function recordStartDateSelection(startDate: string) {
    ReactGA.event("start_date_selected", {startDate: startDate});
}

export function recordSDGSelection(sdg: number) {
    ReactGA.event("sdg_selected", {sdg: sdg});
}

export function recordStarted() {
    ReactGA.event("started");
}

export function recordCompleted(profile: Profile) {
    ReactGA.event("completed", {
        product: profile.product,
        sdg: profile.sdg,
        gtaSubProduct: profile.gtaSubProduct,
        duration: profile.duration,
        region: profile.region,
        startDate: profile.earliestStartDate?.toISOString().split('T')[0],
    });
}