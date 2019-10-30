interface IPlanet {
    x: number;
    y: number;
    z: number;
    polar: number;
    azimuth: number;
}

interface ISolarSystem {
    data: {
        Mercury: IPlanet;
        Venus: IPlanet;
        Earth: IPlanet;
        Mars: IPlanet;
    }
}