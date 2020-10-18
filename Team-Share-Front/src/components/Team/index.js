// == Import : npm
import React from 'react';

// == Import : local
import './team.scss';

// == Composant
const Team = () => (
    <>
        <div className="team">
            <h1 className="team-title">Notre fabuleuse équipe</h1>
            <div className="team-members">
                <div className="team-member">
                    <img className="team-image" src="https://avatars.dicebear.com/api/female/john.svg?mood[]=happy
" alt="avatar de nadia"/>
                    <h3 className="team-member-name">Nadia</h3>
                    <p className="team-member-role">Project Manager</p>
                </div>
                <div className="team-member">
                    <img className="team-image" src="https://i.pravatar.cc/400?img=61" alt="fausse photo de Julien" />
                    <h3 className="team-member-name">Julien</h3>
                    <p className="team-member-role">Product Owner</p>
                </div>
                <div className="team-member">
                    <img className="team-image" src="https://i.pravatar.cc/400?img=11" alt="fausse photo de Alexandre" />
                    <h3 className="team-member-name">Alexandre</h3>
                    <p className="team-member-role">Lead Back</p>
                </div>
                <div className="team-member">
                    <img className="team-image" src="https://i.pravatar.cc/400?img=58" alt="fausse photo de Alexis"/>
                    <h3 className="team-member-name">Alexis</h3>
                    <p className="team-member-role">Lead Front</p>
                </div>
            </div>
        </div>
    </>
);

// == Export
export default Team;

