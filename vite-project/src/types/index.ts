//API Races
interface Location {
  country: string;
  city: string;
}

interface Competition {
  id: number;
  name: string;
  location: Location;
}

interface Circuit {
  id: number;
  name: string;
  image: string;
}

interface Driver {
  id: number | null;
}

interface FastestLap {
  driver: Driver;
  time: string | null;
}

interface Laps {
  current: number | null;
  total: number | null;
}

export interface Race {
  id: number;
  competition: Competition;
  circuit: Circuit;
  season: number;
  type: string;
  laps: Laps;
  fastest_lap: FastestLap;
  distance: string | null;
  timezone: string;
  date: string;
  weather: string | null;
  status: string;
}

export type Races = Race[];

//API Races end

export interface DriverRanking {
  position: number;
  driver: {
    id: number;
    name: string;
    abbr: string;
    number: number;
    image: string;
  };
  team: {
    id: number;
    name: string;
    logo: string;
  };
  points: number;
  wins: number;
  behind: number;
  season: number;
}

export interface DriverDetail {
  id: number;
  name: string;
  abbr: string;
  image: string;
  nationality: string;
  country: {
    name: string;
    code: string;
  };
  birthdate: string;
  birthplace: string;
  number: number;
  grands_prix_entered: number;
  world_championships: number;
  podiums: number;
  highest_race_finish: {
    position: number;
    number: number;
  };
  highest_grid_position: number;
  career_points: string;
  teams: {
    season: number;
    team: {
      id: number;
      name: string;
      logo: string;
    };
  }[];
}
export interface DriverPosition {
  session_key: number;
  meeting_key: number;
  driver_number: number;
  date: string;
  position: number;
}

export interface LiveDriverDetail {
  session_key: number;
  meeting_key: number;
  broadcast_name: string;
  full_name: string;
  driver_number: number;
  country_code: string;
  first_name: string;
  last_name: string;
  headshot_url: string;
  name_acronym: string;
  team_colour: string;
  team_name: string;
}
/*
export type Location = {
  date: string;
  driver_number: number;
  meeting_key: number;
  session_key: number;
  x: number;
  y: number;
  z: number;
};
*/
export type StintData = {
  compound: string;
  driver_number: number;
  lap_end: number;
  lap_start: number;
  meeting_key: number;
  session_key: number;
  stint_number: number;
  tyre_age_at_start: number;
};


export interface CarData {
  meeting_key: number;
  session_key: number;
  driver_number: number;
  date: string;
  rpm: number;
  speed: number;
  n_gear: number;
  throttle: number;
  drs: number;
  brake: number;
}

export interface LapData {
  meeting_key: number;
  session_key: number;
  driver_number: number;
  i1_speed: number;
  i2_speed: number;
  st_speed: number;
  date_start: string;
  lap_duration: number;
  segments_sector_1: number[];
  segments_sector_2: number[];
  segments_sector_3: number[];
  lap_number: number;
  duration_sector_1: number;
  duration_sector_2: number;
  duration_sector_3: number;
  is_pit_out_lap: boolean;
}

export interface IntervalData {
  gap_to_leader: number;
  driver_number: number;
  date: string;
  session_key: number;
  meeting_key: number;
  interval: number | null;
}

export interface PedalBarProps {
  pedalType: 'brake' | 'throttle'; 
}

// debug data
export const generateTestDrivers = (): DriverRanking[] => {
  return [
    {
      position: 1,
      driver: {
        id: 20,
        name: "Lewis Hamilton",
        abbr: "HAM",
        number: 44,
        image: "https://media.api-sports.io/formula-1/drivers/20.png"
      },
      team: {
        id: 5,
        name: "Mercedes-AMG Petronas",
        logo: "https://media.api-sports.io/formula-1/teams/5.png"
      },
      points: 413,
      wins: 11,
      behind: 0,
      season: 2019
    },
    {
      position: 2,
      driver: {
        id: 5,
        name: "Valtteri Bottas",
        abbr: "BOT",
        number: 77,
        image: "https://media.api-sports.io/formula-1/drivers/5.png"
      },
      team: {
        id: 5,
        name: "Mercedes-AMG Petronas",
        logo: "https://media.api-sports.io/formula-1/teams/5.png"
      },
      points: 326,
      wins: 3,
      behind: 87,
      season: 2019
    },
    {
      position: 3,
      driver: {
        id: 25,
        name: "Max Verstappen",
        abbr: "VER",
        number: 33,
        image: "https://media.api-sports.io/formula-1/drivers/25.png"
      },
      team: {
        id: 1,
        name: "Red Bull Racing",
        logo: "https://media.api-sports.io/formula-1/teams/1.png"
      },
      points: 278,
      wins: 3,
      behind: 135,
      season: 2019
    },
    // Další jezdci...
    {
      position: 4,
      driver: {
        id: 34,
        name: "Charles Leclerc",
        abbr: "LEC",
        number: 16,
        image: "https://media.api-sports.io/formula-1/drivers/34.png"
      },
      team: {
        id: 3,
        name: "Scuderia Ferrari",
        logo: "https://media.api-sports.io/formula-1/teams/3.png"
      },
      points: 264,
      wins: 2,
      behind: 149,
      season: 2019
    },
    {
      position: 5,
      driver: {
        id: 19,
        name: "Sebastian Vettel",
        abbr: "VET",
        number: 5,
        image: "https://media.api-sports.io/formula-1/drivers/19.png"
      },
      team: {
        id: 3,
        name: "Scuderia Ferrari",
        logo: "https://media.api-sports.io/formula-1/teams/3.png"
      },
      points: 240,
      wins: 1,
      behind: 173,
      season: 2019
    },
    // Další jezdci...
    {
      position: 6,
      driver: {
        id: 24,
        name: "Carlos Sainz Jr",
        abbr: "SAI",
        number: 55,
        image: "https://media.api-sports.io/formula-1/drivers/24.png"
      },
      team: {
        id: 2,
        name: "McLaren Racing",
        logo: "https://media.api-sports.io/formula-1/teams/2.png"
      },
      points: 96,
      wins: 0,
      behind: 317,
      season: 2019
    },
    {
      position: 7,
      driver: {
        id: 36,
        name: "Pierre Gasly",
        abbr: "GAS",
        number: 10,
        image: "https://media.api-sports.io/formula-1/drivers/36.png"
      },
      team: {
        id: 1,
        name: "Red Bull Racing",
        logo: "https://media.api-sports.io/formula-1/teams/1.png"
      },
      points: 95,
      wins: 0,
      behind: 318,
      season: 2019
    },
    {
      position: 8,
      driver: {
        id: 50,
        name: "Alexander Albon",
        abbr: "ALB",
        number: 23,
        image: "https://media.api-sports.io/formula-1/drivers/50.png"
      },
      team: {
        id: 7,
        name: "Scuderia AlphaTauri Honda",
        logo: "https://media.api-sports.io/formula-1/teams/7.png"
      },
      points: 92,
      wins: 0,
      behind: 321,
      season: 2019
    },
    {
      "position": 9,
      "driver": {
        "id": 6,
        "name": "Daniel Ricciardo",
        "abbr": "RIC",
        "number": 3,
        "image": "https://media.api-sports.io/formula-1/drivers/6.png"
      },
      "team": {
        "id": 3,
        "name": "Renault F1 Team",
        "logo": "https://media.api-sports.io/formula-1/teams/3.png"
      },
      "points": 54,
      "wins": 0,
      "behind": 359,
      "season": 2019
    },
    {
      "position": 10,
      "driver": {
        "id": 27,
        "name": "Nico Hülkenberg",
        "abbr": "HUL",
        "number": 27,
        "image": "https://media.api-sports.io/formula-1/drivers/27.png"
      },
      "team": {
        "id": 3,
        "name": "Renault F1 Team",
        "logo": "https://media.api-sports.io/formula-1/teams/3.png"
      },
      "points": 37,
      "wins": 0,
      "behind": 376,
      "season": 2019
    },
    {
      "position": 11,
      "driver": {
        "id": 9,
        "name": "Sergio Pérez",
        "abbr": "PER",
        "number": 11,
        "image": "https://media.api-sports.io/formula-1/drivers/9.png"
      },
      "team": {
        "id": 9,
        "name": "Racing Point F1 Team",
        "logo": "https://media.api-sports.io/formula-1/teams/9.png"
      },
      "points": 23,
      "wins": 0,
      "behind": 390,
      "season": 2019
    },
    {
      "position": 12,
      "driver": {
        "id": 8,
        "name": "Kimi Räikkönen",
        "abbr": "RAI",
        "number": 7,
        "image": "https://media.api-sports.io/formula-1/drivers/8.png"
      },
      "team": {
        "id": 4,
        "name": "Alfa Romeo Racing",
        "logo": "https://media.api-sports.io/formula-1/teams/4.png"
      },
      "points": 21,
      "wins": 0,
      "behind": 392,
      "season": 2019
    },
    {
      "position": 13,
      "driver": {
        "id": 55,
        "name": "Romain Grosjean",
        "abbr": "GRO",
        "number": 57,
        "image": "https://media.api-sports.io/formula-1/drivers/55.png"
      },
      "team": {
        "id": 6,
        "name": "Haas F1 Team",
        "logo": "https://media.api-sports.io/formula-1/teams/6.png"
      },
      "points": 8,
      "wins": 0,
      "behind": 405,
      "season": 2019
    },
    {
      "position": 14,
      "driver": {
        "id": 39,
        "name": "Kevin Magnussen",
        "abbr": "MAG",
        "number": 20,
        "image": "https://media.api-sports.io/formula-1/drivers/39.png"
      },
      "team": {
        "id": 6,
        "name": "Haas F1 Team",
        "logo": "https://media.api-sports.io/formula-1/teams/6.png"
      },
      "points": 7,
      "wins": 0,
      "behind": 406,
      "season": 2019
    },
    {
      "position": 15,
      "driver": {
        "id": 20,
        "name": "Antonio Giovinazzi",
        "abbr": "GIO",
        "number": 37,
        "image": "https://media.api-sports.io/formula-1/drivers/20.png"
      },
      "team": {
        "id": 4,
        "name": "Alfa Romeo Racing",
        "logo": "https://media.api-sports.io/formula-1/teams/4.png"
      },
      "points": 4,
      "wins": 0,
      "behind": 409,
      "season": 2019
    },
    {
      "position": 16,
      "driver": {
        "id": 7,
        "name": "Robert Kubica",
        "abbr": "KUB",
        "number": 85,
        "image": "https://media.api-sports.io/formula-1/drivers/7.png"
      },
      "team": {
        "id": 5,
        "name": "Williams Racing",
        "logo": "https://media.api-sports.io/formula-1/teams/5.png"
      },
      "points": 1,
      "wins": 0,
      "behind": 412,
      "season": 2019
    },
    {
      "position": 17,
      "driver": {
        "id": 22,
        "name": "George Russell",
        "abbr": "RUS",
        "number": 63,
        "image": "https://media.api-sports.io/formula-1/drivers/22.png"
      },
      "team": {
        "id": 5,
        "name": "Williams Racing",
        "logo": "https://media.api-sports.io/formula-1/teams/5.png"
      },
      "points": 0,
      "wins": 0,
      "behind": 413,
      "season": 2019
    },
    {
      "position": 18,
      "driver": {
        "id": 33,
        "name": "Nicholas Latifi",
        "abbr": "LAT",
        "number": 6,
        "image": "https://media.api-sports.io/formula-1/drivers/33.png"
      },
      "team": {
        "id": 5,
        "name": "Williams Racing",
        "logo": "https://media.api-sports.io/formula-1/teams/5.png"
      },
      "points": 0,
      "wins": 0,
      "behind": 413,
      "season": 2019
    },
    {
      "position": 19,
      "driver": {
        "id": 63,
        "name": "Esteban Ocon",
        "abbr": "OCO",
        "number": 31,
        "image": "https://media.api-sports.io/formula-1/drivers/63.png"
      },
      "team": {
        "id": 3,
        "name": "Renault F1 Team",
        "logo": "https://media.api-sports.io/formula-1/teams/3.png"
      },
      "points": 0,
      "wins": 0,
      "behind": 413,
      "season": 2019
    },
    {
      "position": 20,
      "driver": {
        "id": 35,
        "name": "Sergey Sirotkin",
        "abbr": "SIR",
        "number": 89,
        "image": "https://media.api-sports.io/formula-1/drivers/35.png"
      },
      "team": {
        "id": 5,
        "name": "Williams Racing",
        "logo": "https://media.api-sports.io/formula-1/teams/5.png"
      },
      "points": 0,
      "wins": 0,
      "behind": 413,
      "season": 2019
    }
  ];
};

export const generateTestDriverDetail = (): DriverDetail => {
  return {
    id: 20,
    name: "Lewis Hamilton",
    abbr: "HAM",
    image: "https://media.api-sports.io/formula-1/drivers/20.png",
    nationality: "British",
    country: {
      name: "United Kingdom",
      code: "GB"
    },
    birthdate: "1985-01-07",
    birthplace: "Stevenage, England",
    number: 44,
    grands_prix_entered: 288,
    world_championships: 7,
    podiums: 182,
    highest_race_finish: {
      position: 1,
      number: 103
    },
    highest_grid_position: 1,
    career_points: "4165.5",
    teams: [
      {
        season: 2019,
        team: {
          id: 5,
          name: "Mercedes-AMG Petronas",
          logo: "https://media.api-sports.io/formula-1/teams/5.png"
        }
      },
      // Další řádky pro další týmy...
    ]
  };
};

