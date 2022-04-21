import {Cloudinary} from "@cloudinary/url-gen";
import {fill} from "@cloudinary/url-gen/actions/resize";
import {max} from "@cloudinary/url-gen/actions/roundCorners";

export const MY = "my";
export const ADMIN = "admin";
export const USER = "user";
export const IMAGE_PLACEHOLDER = "https://i.ibb.co/LrdpnJ5/movie-poster-coming-soon-2.png";
export const CLOUD_NAME = "cs5610-project"
export const UPLOAD_PRESET = "dulh2n67";
export const INITIAL_PAGES = [1, 2, 3, 4, 5]

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

export const getDateYYYYMMDD = (date) => {
    return date.split("T")[0];
}
export const getDate = (date) => {
    date = new Date(date);
    return `${MONTHS[date.getUTCMonth()]} ${date.getUTCDate()}, ${date.getUTCFullYear()}`;
}
export const resetScrollToTop = () => {
    window.scrollTo(0, 0);
}
export const cloud = new Cloudinary({cloud: {cloudName: CLOUD_NAME}});
export const getAvatar = (profilePhoto) => {
    return cloud.image(profilePhoto).resize(fill(300, 300)).roundCorners(max()).toURL()
}