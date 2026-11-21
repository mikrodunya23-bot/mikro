"""Episode table for "Kapıdaki Kurye — Bölüm 1" (15 min).
Each scene: amb (ambience loop in ep/amb), mus (music cue in ep/music), panels.
Each panel: art, lines (ids from ep/lines.tsv), pos (who -> l/c/r for balloon tails and camera focus),
optional lead/tail/fixed seconds, card (big centred text), sfx [(name, offset, volume)], shake, flash, title."""

EPISODE = [
    dict(id="s01", amb="lobby", mus="tense", panels=[
        dict(art="fallen", lines=["s01a"], lead=1.2, tail=1.0, sfx=[("crowd_laugh", 0.1, 0.5), ("body_fall", 0.0, 0.6)]),
        dict(art="card", card="ÜÇ GÜN ÖNCE", fixed=3.0)]),
    dict(id="s02", amb="hospital", mus="sad", panels=[
        dict(art="hospital", lines=["s02a", "s02b"], pos={"deniz": "l"}, intro=[("DENİZ ARAL", "Aral Holding'in kurucusu", "l")], lead=2.0, tail=2.2, sfx=[("flatline", "end-2.0", 0.45)])]),
    dict(id="s03", amb="funeral_rain", mus="sad", panels=[
        dict(art="funeral", lines=["s03a"], lead=1.8, tail=1.5)]),
    dict(id="s04", amb="office_london", mus="sad", panels=[
        dict(art="screens", lines=["s04a", "s04b"], lead=1.2, tail=0.8),
        dict(art="signature", lines=["s04c"], lead=0.8, tail=1.2)]),
    dict(id="s05", amb="airport", mus="warm", panels=[
        dict(art="plane", lines=["s05a"], lead=1.8, tail=1.0),
        dict(art="taxi", lines=["s05e", "s05f"], lead=0.8, tail=0.8),
        dict(art="phoneSplit", lines=["s05b", "s05c", "s05d"], pos={"cem": "l", "murat": "r"}, intro=[("MURAT BEY", "Genel Müdür", "r")], lead=1.2, tail=1.0, sfx=[("phone_ring", 0.0, 0.5)])]),
    dict(id="s06", amb="lobby", mus="tense", panels=[
        dict(art="lobbyPrep", lines=["s06a", "s06b", "s06c"], pos={"aylin": "c"}, lead=1.2, intro=[("AYLİN HANIM", "Danışman · Karşılama şefi", "c")]),
        dict(art="guardProud", lines=["s06d"], pos={"ercument": "c"}, intro=[("ERCÜMENT", "Güvenlik şefi", "c")]),
        dict(art="gossip", lines=["s06e", "s06f", "s06g"], pos={"kaan": "l", "selin": "r"}, intro=[("KAAN BEY", "Finans müdürü", "l"), ("SELİN HANIM", "Pazarlama müdürü", "r")]),
        dict(art="copier", lines=["s06h", "s06i", "s06j", "s06k"], pos={"aylin": "l", "ece": "r"}, tail=1.0, intro=[("ECE", "Stajyer · işte 2. günü", "r")])]),
    dict(id="s07", amb="tea_garden", mus="warm", panels=[
        dict(art="teaGarden", lines=["s07a", "s07b", "s07c", "s07d", "s07e", "s07f", "s07g", "s07h", "s07i", "s07j"], pos={"cem": "l", "murat": "r"}, lead=2.0, tail=1.2)]),
    dict(id="s08", amb="street", mus="tense", panels=[
        dict(art="street", lines=["s08a"], lead=1.6, tail=1.0)]),
    dict(id="s09", amb="street", mus="warm", panels=[
        dict(art="hasan", lines=["s09a", "s09b", "s09c"], pos={"cem": "l", "hasan": "r"}, lead=1.0, intro=[("HASAN ABİ", "Mahallenin kuryesi", "r")]),
        dict(art="money", lines=["s09d"], pos={"hasan": "r"}, lead=0.6, tail=0.6),
        dict(art="hasan", lines=["s09e", "s09f", "s09g", "s09h", "s09i"], pos={"cem": "l", "hasan": "r"}, lead=0.4, tail=1.2, sfx=[("scooter", "end-1.4", 0.5)])]),
    dict(id="s10", amb="shop", mus="tense", panels=[
        dict(art="parcelMake", lines=["s10a"], lead=1.4, tail=1.0)]),
    dict(id="s11", amb="rain_city", mus="tense", panels=[
        dict(art="tower", lines=["s11a"], lead=1.4, tail=0.6),
        dict(art="visor", lines=["s11b"], lead=0.5, tail=0.8),
        dict(art="walk", fixed=3.0)]),
    dict(id="s12", amb="lobby", mus="tense", panels=[
        dict(art="lobbyBanner", lines=["s12b", "s12a"], lead=1.0, tail=0.8)]),
    dict(id="s13", amb="lobby", mus="tense", panels=[
        dict(art="reception", lines=["s13a", "s13b", "s13c"], pos={"aylin": "c", "cem": "l"}, lead=0.6),
        dict(art="trash", lines=["s13d"], pos={"aylin": "r"}, tail=0.8)]),
    dict(id="s14", amb="lobby", mus="tense", panels=[
        dict(art="guard", lines=["s14a", "s14b", "s14c"], pos={"ercument": "c", "cem": "l"}, shake=0.0),
        dict(art="bam", fixed=1.8, shake=0.1, sfx=[("body_fall", 0.05, 0.7)]),
        dict(art="fallen", lines=["s14d"], lead=0.8, tail=1.2, sfx=[("crowd_laugh", 0.0, 0.5)])]),
    dict(id="s15", amb="lobby", mus="warm", panels=[
        dict(art="eceHand", lines=["s15a", "s15b", "s15c"], pos={"ece": "c"}, lead=0.8, tail=0.8),
        dict(art="eceAylin", lines=["s15d"], pos={"aylin": "l", "ece": "r"}, tail=0.8)]),
    dict(id="s16", amb="lobby", mus="tense", panels=[
        dict(art="managers", lines=["s16a", "s16b", "s16c"], pos={"selin": "l", "kaan": "r"}, tail=1.0),
        dict(art="cemHelmet", lines=["s17a"], lead=0.8, tail=1.4)]),
    dict(id="s18", amb="alley_night", mus="warm", panels=[
        dict(art="backDoor", lines=["s18a", "s18b", "s18c", "s18d", "s18e", "s18f", "s18h", "s18i", "s18j", "s18k", "s18l", "s18g", "s18m"], pos={"cem": "l", "ece": "r"}, lead=1.8, tail=1.4)]),
    dict(id="s19", amb="rain_city", mus="tense", panels=[
        dict(art="card", card="İKİ GÜN SONRA", fixed=3.0),
        dict(art="phoneSplit", lines=["s19c", "s19d", "s19e"], pos={"murat": "r", "cem": "l"}, sfx=[("phone_ring", 0.0, 0.5)]),
        dict(art="rainWait", lines=["s19a", "s19b"], pos={"ercument": "r"}, lead=1.0, tail=1.0)]),
    dict(id="s20", amb="lobby", mus="tense", panels=[
        dict(art="papers", lines=["s20a", "s20b"], pos={"aylin": "c"}, sfx=[("papers", "line1-0.3", 0.6)]),
        dict(art="coffee", lines=["s20c"], pos={"kaan": "c"}, sfx=[("coffee", 0.1, 0.6)], tail=0.8),
        dict(art="mop", lines=["s20g", "s20h", "s20i"], pos={"ercument": "r", "selin": "l"}),
        dict(art="boxes", lines=["s20d"], pos={"selin": "l"}),
        dict(art="conspire", lines=["s20j", "s20k", "s20l", "s20m"], pos={"kaan": "r", "aylin": "l"}, lead=1.0),
        dict(art="elevatorBlock", lines=["s20e", "s20f"], pos={"ercument": "c"}, tail=1.0)]),
    dict(id="s21", amb="stairwell", mus="warm", panels=[
        dict(art="stairs", lines=["s21a", "s21b", "s21c", "s21d"], pos={"cem": "l", "ece": "r"}, lead=1.4, tail=1.0)]),
    dict(id="s22", amb="rooftop", mus="warm", panels=[
        dict(art="rooftop", lines=["s22a", "s22b", "s22c", "s22d", "s22e", "s22f", "s22g"], pos={"cem": "l", "ece": "r"}, lead=2.0, tail=1.6)]),
    dict(id="s23", amb="office", mus="tense", panels=[
        dict(art="muratOffice", lines=["s23a", "s23b", "s23c", "s23d", "s23e"], pos={"cem": "l", "murat": "r"}, lead=1.0, tail=0.6)]),
    dict(id="s24", amb="office", mus="mystery", panels=[
        dict(art="eavesdrop", lines=["s24a", "s24b", "s24c"], pos={"ece": "l"}, lead=0.8, tail=1.2),
        dict(art="eceNight", lines=["s24d", "s24e", "s24f"], pos={"ece": "c"}, lead=1.2, tail=1.2)]),
    dict(id="s25", amb="lobby", mus="triumph", panels=[
        dict(art="card", card="TOPLANTI GÜNÜ", fixed=3.0),
        dict(art="hotelMirror", lines=["s25b", "s25c", "s25d"], pos={"cem": "c", "murat": "r"}, lead=1.2),
        dict(art="lobbyPrep", lines=["s25a"], pos={"aylin": "c"})]),
    dict(id="s26", amb="lobby", mus="triumph", panels=[
        dict(art="suitEntrance", lines=["s26a", "s26b", "s26c"], pos={"murat": "r"}, lead=1.4, sfx=[("heels", 0.0, 0.4), ("gasp", "line2", 0.5)]),
        dict(art="guardProud", lines=["s26f"], pos={"ercument": "c"}),
        dict(art="cemSmile", lines=["s26g"], tail=0.6),
        dict(art="managers", lines=["s26h"], pos={"selin": "l"}),
        dict(art="aylinFace", lines=["s26d", "s26e"], pos={"cem": "l", "aylin": "r"}, tail=1.0)]),
    dict(id="s27", amb="boardroom", mus="triumph", panels=[
        dict(art="boardroom2", lines=["s27a", "s27b", "s27c", "s27d"], pos={"cem": "c"}, lead=1.4),
        dict(art="firing", lines=["s27e", "s27f", "s27j", "s27k", "s27l", "s27m"], pos={"aylin": "l", "kaan": "l", "selin": "r", "cem": "c"}),
        dict(art="boardroom2", lines=["s27g", "s27h", "s27i"], pos={"cem": "c"}, tail=1.0)]),
    dict(id="s28", amb="boardroom", mus="mystery", panels=[
        dict(art="eceEntrance", lines=["s28a", "s28b", "s28c"], pos={"ece": "c"}, lead=1.6, flash=0.0, sfx=[("door_open", 0.0, 0.6), ("heels", 0.5, 0.45), ("gasp", "line1", 0.5)]),
        dict(art="cemSmile", lines=["s28d", "s28e"], lead=0.6),
        dict(art="eceEntrance", lines=["s28f"], pos={"ece": "c"}, tail=1.0)]),
    dict(id="s29", amb="office", mus="warm", panels=[
        dict(art="hasanUniform", lines=["s29d", "s29e"], pos={"hasan": "l", "cem": "r"}, lead=1.0),
        dict(art="finalTwo", lines=["s29a", "s29b", "s29c"], pos={"cem": "l", "ece": "r"}, lead=1.6, tail=2.0)]),
    dict(id="s30", amb="rain_city", mus="mystery", panels=[
        dict(art="rival", lines=["s30a", "s30b", "s30c"], pos={"aylin": "l", "tarik": "r"}, lead=1.4, tail=1.2, intro=[("TARIK KARACA", "Karaca Holding · rakip", "r")]),
        dict(art="titleEnd", fixed=6.5, title=True)]),
]
