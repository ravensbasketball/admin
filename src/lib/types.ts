export interface Team {
	id: string;
	name: string;
	created_at?: string;
}

export interface Fixture {
	id: string;
	hometeam_id: string | null;
	awayteam_id: string | null;
	tipoff: string | null;
	created_at?: string;
}

export interface FixtureWithTeams extends Fixture {
	hometeam: Team | null;
	awayteam: Team | null;
}
