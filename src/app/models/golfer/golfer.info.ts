export class GolferInfo {
    lat: number;
    lng: number;
    name: string;

    constructor(playerName?: string, playerLat?: number, playerLng?: number) {
        if (playerName) { this.name = playerName; }
        if (playerLat) { this.lat = playerLat; }
        if (playerName) { this.lng = playerLng; }
    }
}
