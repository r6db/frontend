import * as React from "react";

import EMAIL from "feather-icons/dist/icons/mail.svg";
import TWITTER from "feather-icons/dist/icons/twitter.svg";
import GITHUB from "feather-icons/dist/icons/github.svg";
import DOWNLOAD from "feather-icons/dist/icons/download.svg";

import LOGO from "assets/r6db_logo_new.svg";
import UBI from "assets/ubi.svg";
import ESL from "assets/esl.svg";
import DISCORD from "assets/discord.svg";
import NOAVATAR from "assets/noavatar.svg";
import STAR from "assets/star.svg";
import REFRESH from "assets/refresh.svg";

import RANK0 from "assets/ranks/0.svg";
import RANK1 from "assets/ranks/1.svg";
import RANK2 from "assets/ranks/2.svg";
import RANK3 from "assets/ranks/3.svg";
import RANK4 from "assets/ranks/4.svg";
import RANK5 from "assets/ranks/5.svg";
import RANK6 from "assets/ranks/6.svg";
import RANK7 from "assets/ranks/7.svg";
import RANK8 from "assets/ranks/8.svg";
import RANK9 from "assets/ranks/9.svg";
import RANK10 from "assets/ranks/10.svg";
import RANK11 from "assets/ranks/11.svg";
import RANK12 from "assets/ranks/12.svg";
import RANK13 from "assets/ranks/13.svg";
import RANK14 from "assets/ranks/14.svg";
import RANK15 from "assets/ranks/15.svg";
import RANK16 from "assets/ranks/16.svg";
import RANK17 from "assets/ranks/17.svg";
import RANK18 from "assets/ranks/18.svg";
import RANK19 from "assets/ranks/19.svg";
import RANK20 from "assets/ranks/20.svg";

import ASH from "assets/operators/ash.svg";
import BANDIT from "assets/operators/bandit.svg";
import BLACKBEARD from "assets/operators/blackbeard.svg";
import BLITZ from "assets/operators/blitz.svg";
import BUCK from "assets/operators/buck.svg";
import CAPITAO from "assets/operators/capitao.svg";
import CASTLE from "assets/operators/castle.svg";
import CAVEIRA from "assets/operators/caveira.svg";
import DOC from "assets/operators/doc.svg";
import ECHO from "assets/operators/echo.svg";
import ELA from "assets/operators/ela.svg";
import FROST from "assets/operators/frost.svg";
import FUZE from "assets/operators/fuze.svg";
import GLAZ from "assets/operators/glaz.svg";
import HIBANA from "assets/operators/hibana.svg";
import IQ from "assets/operators/iq.svg";
import JACKAL from "assets/operators/jackal.svg";
import JAGER from "assets/operators/jager.svg";
import KAPKAN from "assets/operators/kapkan.svg";
import LESION from "assets/operators/lesion.svg";
import MIRA from "assets/operators/mira.svg";
import MONTAGNE from "assets/operators/montagne.svg";
import MUTE from "assets/operators/mute.svg";
import PULSE from "assets/operators/pulse.svg";
import ROOK from "assets/operators/rook.svg";
import SLEDGE from "assets/operators/sledge.svg";
import SMOKE from "assets/operators/smoke.svg";
import TACHANKA from "assets/operators/tachanka.svg";
import THATCHER from "assets/operators/thatcher.svg";
import THERMITE from "assets/operators/thermite.svg";
import TWITCH from "assets/operators/twitch.svg";
import VALKYRIE from "assets/operators/valkyrie.svg";
import YING from "assets/operators/ying.svg";
import DOKKAEBI from "assets/operators/dokkaebi.svg";
import VIGIL from "assets/operators/vigil.svg";
import ZOFIA from "assets/operators/zofia.svg";
import LION from "assets/operators/lion.svg";
import FINKA from "assets/operators/finka.svg";

import LOGODEFAULT from "assets/seasonlogos/R6-Default-Horizontal.svg"
import LOGOS1 from "assets/seasonlogos/R6-OPBlackIce-Horizontal.svg";
import LOGOS2 from "assets/seasonlogos/R6-OPDustLine-Horizontal.svg";
import LOGOS3 from "assets/seasonlogos/R6-OPSkullRain-Horizontal.svg";
import LOGOS4 from "assets/seasonlogos/R6-OPRedCrow-Horizontal.svg";
import LOGOS5 from "assets/seasonlogos/R6-OPVelvetShell-Horizontal.svg";
import LOGOS6 from "assets/seasonlogos/R6-OPHealth-Horizontal.svg";
import LOGOS7 from "assets/seasonlogos/R6-OPBloodOrchid-Horizontal.svg";
import LOGOS8 from "assets/seasonlogos/R6-OPWhiteNoise-Horizontal.svg";
import LOGOS9 from "assets/seasonlogos/R6-OPChimera-Horizontal.svg";

export default props =>
    props.glyph ? (
        <svg
            className={`icon ${props.className}`}
            viewBox={props.glyph.viewBox}
            preserveAspectRatio={props.preserveAspectRatio}
            fill={props.fill}
            stroke={props.stroke}
        >
            <use xlinkHref={props.glyph} />
        </svg>
    ) : (
        <svg className="icon" />
    );

export const GLYPHS = {
    UBI,
    ESL,
    LOGO,
    DOWNLOAD,
    TWITTER,
    GITHUB,
    EMAIL,
    DISCORD,
    NOAVATAR,
    STAR,
    REFRESH,
    RANK0,
    RANK1,
    RANK2,
    RANK3,
    RANK4,
    RANK5,
    RANK6,
    RANK7,
    RANK8,
    RANK9,
    RANK10,
    RANK11,
    RANK12,
    RANK13,
    RANK14,
    RANK15,
    RANK16,
    RANK17,
    RANK18,
    RANK19,
    RANK20,
    ASH,
    BANDIT,
    BLACKBEARD,
    BLITZ,
    BUCK,
    CAPITAO,
    CASTLE,
    CAVEIRA,
    DOC,
    ECHO,
    ELA,
    FINKA,
    FROST,
    FUZE,
    GLAZ,
    HIBANA,
    IQ,
    JACKAL,
    JAGER,
    KAPKAN,
    LESION,
    LION,
    MIRA,
    MONTAGNE,
    MUTE,
    PULSE,
    ROOK,
    SLEDGE,
    SMOKE,
    TACHANKA,
    THATCHER,
    THERMITE,
    TWITCH,
    VALKYRIE,
    YING,
    DOKKAEBI,
    VIGIL,
    ZOFIA,
    LOGODEFAULT,
    LOGOS1,
    LOGOS2,
    LOGOS3,
    LOGOS4,
    LOGOS5,
    LOGOS6,
    LOGOS7,
    LOGOS8,
    LOGOS9,
};
