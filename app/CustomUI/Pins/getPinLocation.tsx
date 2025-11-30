async function getPinLocation(lat: number, lng: number): Promise<string | null> {
    const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`,{
        headers: {
                "User-Agent": "findyourway/1.0 ethan65g@gmail.com",
                "Accept": "application/json",
        },
    }
    );
    const data = await res.json();
    const addr = data.address ?? {};
    const main = data.name ?? addr.road;
    const city = addr.city ?? addr.town ?? addr.village ?? "";
    const country = addr.country ?? "";
    const postcode = addr.postcode ?? "";

    const pinPlace = [main, city, country, postcode].filter(Boolean).join(", ");
    return pinPlace;
}

export default getPinLocation;
