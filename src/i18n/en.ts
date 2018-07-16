export const translations = {
    "appname": "Rainbow Six Database",
    "shortname": "R6DB",
    "search": "Search",
    "platform": "Platform",
    "board": "Board",
    "rank": "Rank",
    "maxRank": "max. Rank",
    "mmr": "MMR",
    "skillUncertainty": "Skill ± Uncertainty",
    "player": "Player",
    "rating": "Rating",
    "wins": "Wins",
    "losses": "Losses",
    "abandons": "Abandons",
    "winRate": "Win rate",
    "kills": "Kills",
    "deaths": "Deaths",
    "suicides": "Suicides",
    "assists": "Assists",
    "accuracy": "Accuracy",
    "headshots": "Headshots",
    "headshotRatio": "Headshots / Kills",
    "headshotHits": "Headshots / Hits",
    "dbnos": "DBNOs",
    "playtime": "Playtime",
    "melee": "Melee kills",
    "revives": "Revives",
    "revivesDenied": "Revives denied",
    "gadgetsDestroyed": "Gadgets destroyed",
    "penKills": "Penetration kills",
    "blindKills": "Blindfires",
    "rappelBreaches": "Rappel breaches",
    "timePlayed": "Time played",
    "seasonname": `{season, select,
        -1 {All time}
        0 {Release}
        1 {Black Ice}
        2 {Dust Line}
        3 {Skull Rain}
        4 {Red Crow}
        5 {Velvet Shell}
        6 {Operation Health}
        7 {Blood Orchid}
        8 {White Noise}
        9 {Chimera}
        10 {Para Bellum}
    }`,
    "andLater": " and later",

    "emea/short": "Europe",
    "emea/long": "Europe, Middle East & Africa",
    "ncsa/short": "America",
    "ncsa/long": "North, Central & South America",
    "apac/short": "Asia",
    "apac/long": "Asia & Pacific Area",

    "mode/bomb": "Bomb",
    "mode/secure": "Secure Area",
    "mode/secure/first": "First to secure",
    "mode/secure/secured": "Secured",
    "mode/secure/denied": "Secure denied",
    "mode/hostage": "Hostage",
    "mode/hostage/extracted": "Extractions",
    "mode/hostage/denied": "Extranctions denied",

    "menu/home": "Home",
    "menu/leaderboard": "Leaderboard",
    "menu/favorites": "Favorites",
    "menu/compare": "Compare (beta)",
    "menu/faq": "FAQ",
    "menu/privacy": "Privacy policy",
    "menu/delete": "Delete profile",
    "menu/disclaimer": "This site is not affiliated with Ubisoft.",
    "home/search_placeholder": "Search for players...",

    "search/no_results": "We could not find any players matching that query.",
    "search/query": "Search for \"{name}\"",
    "search/resultcount": `{count, plural,
        0= {# results}
        one {# result}
        other {# results}
    }`,
    "search/resultplatform": " on {platform}",
    "search/result/aliascount": "and {count, number} more",
    "search/result/timeplayed": "{playtime} played",
    "search/go": "GO",

    "leaderboard/title": "Leaderboard",
    "leaderboard/rankdist": "Rank distribution",
    "leaderboard/disclaimer": `Any accounts abusing the ranked system will be removed from the leaderboard. \n Our ban policy can be found here: {linkPolicy}. Reports can be submitted over this form: {linkReport}.`,
    "leaderboard/go": "GO",
    "leaderboard/chankaboard": "Most kills with Tachanka LMG",

    "favorites/title": "Favorites",
    "favorites/addmore": "You can add more people by clicking the 'Favorite' button on the player page!",
    "favorites/empty_header": "It's empty here!",
    "favorites/empty_text": "You haven't saved any players to your favorites yet.",

    "compare/add": "Add player",
    "compare/title": "Compare",
    "compare/mmr": "MMR (most active region)",
    "compare/ranking": "Ranking",
    "compare/win": "Win percentage (ranked)",
    "compare/ops": "most played Operators",
    "compare/kdranked": "KD ratio (ranked)",
    "compare/kdglobal": "KD ratio (global)",
    "compare/kdaglobal": "KDA ratio (global)",

    "delete/title": "Delete Account",
    "delete/intro": `We need to make sure that only the account owner can delete his data. Please follow the steps below to validate ownership and trigger deletion. Do note, that the deletion process is final and irreversible. {emphasis}`,
    "delete/contactus": "Please contact us if this page does not work for you.",
    "delete/step": "Step {step, number}",
    "delete/step1_title": "Enter the link to your R6DB profile",
    "delete/step1_instruction": "To start the deletion process, please enter your full R6DB profile URL down below.",
    "delete/downloadqr": "Download QR code",
    "delete/step2_title": "Change your UPlay avatar to the QR Code above",
    "delete/step2_instruction":
        "You can do this by visiting the { club }. Console users might need to connect their account on the { accounts } page first.",
    "delete/club": "Ubisoft Club",
    "delete/accounts": "Ubisoft Accounts",
    "delete/step3_title": "Confirm deletion of your account",
    "delete/step3_instruction": "Before you deactivate your account, know this:",
    "delete/step3_noreadd": "Deletion is <b>FINAL</b> and <b>CANNOT</b> be undone.",
    "delete/step3_fulldelete":
        "We will delete all your userdata from our servers, including historical data like seasonal rankings and aliases.",
    "delete/step3_blacklist": "Your account will be added to a blacklist to prevent future fetching of your data.",
    "delete/step3_leaderboard":
        "Your account will not show up in the leaderboards and is not included in global/regional rankings.",
    "delete/step3_confirm": "Yes, I want to delete my data permanently from R6DB.",
    "delete/confirm": "Confirm deletion",

    "player/norecord": "We have not recorded this players stats for this season.",
    "player/timeframe": "timeframe",
    "player/available": "Update available at {date}",
    "player/season": "Season {season, number}",
    "player/extended": "Extended view",
    "player/placement": "Global #{placement, number}",
    "player/timestamps": "Timestamps",
    "player/firstAdded": "First added",
    "player/lastPlayed": "Last played",
    "player/casual": "Casual",
    "player/ranked": "Ranked",
    "player/general": "General",
    "player/total": "Total",
    "player/rankedseason": "Ranked season ({region})",
    "player/winRatePercentage": "Win Rate (%)",
    "player/accuChart": "Headshots per hit (%)",
    "player/hsRate": "Headshots per hit",
    "player/queueChart": "Games per queue",
    "player/modeChart": "Games per mode",
    "player/rank": "Rank",
    "player/max": "Max",
    "player/skill": "Skill",
    "kdRatio": "K/D ratio",
    "player/notYetLoaded": "Data not yet loaded...",
    "player/downloadJson": "Save as JSON",
    "player/rankingLevel": "{placement} global / lvl {level, number}",
    "player/ubisoft": "Ubisoft",
    "player/esl": "ESL",
    "player/simple": "Simple view",
    "player/updateAvailable": "available {date}",
    "player/update": "Update",
    "player/favorite": "Favorite",
    "player/tab/summary": "Summary",
    "player/tab/operators": "Operators",
    "player/tab/ranks": "Ranks",
    "player/filterby": "Filter by",
    "player/sorter/name": "Name",
    "player/sorter/won": "Won",
    "player/sorter/lost": "Lost",
    "player/sorter/wlr": "W/L ratio",
    "player/sorter/kills": "Kills",
    "player/sorter/deaths": "Deaths",
    "player/sorter/kdr": "K/D ratio",
    "player/sorter/kpr": "Kills/Round",
    "player/sorter/survival": "Rounds survived",
    "player/sorter/time": "Time played",
    "player/seeMore": "Click to see additional data",
    "alias/noDate": "No date",
    "player/aliasHistory": "Alias History",
    "player/showLess": "Show less",
    "player/showMore": "Show more",
    "player/rankingsUnlock": "Rankings unlock at level 100",
    "player/shrug": "¯\\\\_(ツ)_/¯",
    "player/noOldSeasons": "Waiting for UBI to fix old seasons",
    "player/maxScore": "Max score"
};
