
export const GetVendorToken = () => {
    const token = localStorage.getItem("vendorToken");
    return token
}