"""Menu labels for audio/caption tracks."""

from __future__ import annotations

from collections import Counter

UNKNOWN_LANGS = frozenset({"", "und", "unknown", "unk", "mis", "mul", "zxx"})

# One row per language: English name + every ISO 639-1/639-2 code for it
# (both bibliographic and terminology variants where they differ, e.g. chi/zho).
_LANGUAGES: dict[str, tuple[str, ...]] = {
    "Abkhaz": ("ab", "abk"),
    "Afar": ("aa", "aar"),
    "Afrikaans": ("af", "afr"),
    "Akan": ("ak", "aka"),
    "Albanian": ("sq", "alb", "sqi"),
    "Amharic": ("am", "amh"),
    "Aragonese": ("an", "arg"),
    "Arabic": ("ar", "ara"),
    "Armenian": ("hy", "arm", "hye"),
    "Assamese": ("as", "asm"),
    "Avaric": ("av", "ava"),
    "Avestan": ("ae", "ave"),
    "Aymara": ("ay", "aym"),
    "Azerbaijani": ("az", "aze"),
    "Bambara": ("bm", "bam"),
    "Bashkir": ("ba", "bak"),
    "Basque": ("eu", "baq", "eus"),
    "Belarusian": ("be", "bel"),
    "Bengali": ("bn", "ben"),
    "Bihari": ("bh", "bih"),
    "Bislama": ("bi", "bis"),
    "Bosnian": ("bs", "bos"),
    "Breton": ("br", "bre"),
    "Bulgarian": ("bg", "bul"),
    "Burmese": ("my", "bur", "mya"),
    "Catalan": ("ca", "cat"),
    "Chamorro": ("ch", "cha"),
    "Chechen": ("ce", "che"),
    "Chichewa": ("ny", "nya"),
    "Chinese": ("zh", "chi", "zho"),
    "Chuvash": ("cv", "chv"),
    "Cornish": ("kw", "cor"),
    "Corsican": ("co", "cos"),
    "Cree": ("cr", "cre"),
    "Croatian": ("hr", "scr", "hrv"),
    "Czech": ("cs", "cze", "ces"),
    "Danish": ("da", "dan"),
    "Divehi": ("dv", "div"),
    "Dutch": ("nl", "dut", "nld"),
    "Dzongkha": ("dz", "dzo"),
    "English": ("en", "eng"),
    "Esperanto": ("eo", "epo"),
    "Estonian": ("et", "est"),
    "Ewe": ("ee", "ewe"),
    "Faroese": ("fo", "fao"),
    "Fijian": ("fj", "fij"),
    "Finnish": ("fi", "fin"),
    "French": ("fr", "fre", "fra"),
    "Fula": ("ff", "ful"),
    "Galician": ("gl", "glg"),
    "Ganda": ("lg", "lug"),
    "Georgian": ("ka", "geo", "kat"),
    "German": ("de", "ger", "deu"),
    "Greek": ("el", "gre", "ell"),
    "Guaraní": ("gn", "grn"),
    "Gujarati": ("gu", "guj"),
    "Haitian": ("ht", "hat"),
    "Hausa": ("ha", "hau"),
    "Hebrew": ("he", "heb"),
    "Herero": ("hz", "her"),
    "Hindi": ("hi", "hin"),
    "Hiri Motu": ("ho", "hmo"),
    "Hungarian": ("hu", "hun"),
    "Icelandic": ("is", "ice", "isl"),
    "Ido": ("io", "ido"),
    "Igbo": ("ig", "ibo"),
    "Indonesian": ("id", "ind"),
    "Interlingua": ("ia", "ina"),
    "Interlingue": ("ie", "ile"),
    "Inuktitut": ("iu", "iku"),
    "Inupiaq": ("ik", "ipk"),
    "Irish": ("ga", "gle"),
    "Italian": ("it", "ita"),
    "Japanese": ("ja", "jpn"),
    "Javanese": ("jv", "jav"),
    "Kalaallisut": ("kl", "kal"),
    "Kannada": ("kn", "kan"),
    "Kanuri": ("kr", "kau"),
    "Kashmiri": ("ks", "kas"),
    "Kazakh": ("kk", "kaz"),
    "Khmer": ("km", "khm"),
    "Kikuyu": ("ki", "kik"),
    "Kinyarwanda": ("rw", "kin"),
    "Kirundi": ("rn", "run"),
    "Komi": ("kv", "kom"),
    "Kongo": ("kg", "kon"),
    "Korean": ("ko", "kor"),
    "Kurdish": ("ku", "kur"),
    "Kwanyama": ("kj", "kua"),
    "Kyrgyz": ("ky", "kir"),
    "Lao": ("lo", "lao"),
    "Latin": ("la", "lat"),
    "Latvian": ("lv", "lav"),
    "Limburgish": ("li", "lim"),
    "Lingala": ("ln", "lin"),
    "Lithuanian": ("lt", "lit"),
    "Luba-Katanga": ("lu", "lub"),
    "Luxembourgish": ("lb", "ltz"),
    "Macedonian": ("mk", "mac", "mkd"),
    "Malagasy": ("mg", "mlg"),
    "Malay": ("ms", "may", "msa"),
    "Malayalam": ("ml", "mal"),
    "Maltese": ("mt", "mlt"),
    "Manx": ("gv", "glv"),
    "Marathi": ("mr", "mar"),
    "Marshallese": ("mh", "mah"),
    "Mongolian": ("mn", "mon"),
    "Māori": ("mi", "mao", "mri"),
    "Nauru": ("na", "nau"),
    "Navajo": ("nv", "nav"),
    "Ndonga": ("ng", "ndo"),
    "Nepali": ("ne", "nep"),
    "North Ndebele": ("nd", "nde"),
    "Norwegian": ("no", "nor"),
    "Norwegian Bokmål": ("nb", "nob"),
    "Norwegian Nynorsk": ("nn", "nno"),
    "Nuosu": ("ii", "iii"),
    "Northern Sami": ("se", "sme"),
    "Occitan": ("oc", "oci"),
    "Ojibwe": ("oj", "oji"),
    "Old Church Slavonic": ("cu", "chu"),
    "Oriya": ("or", "ori"),
    "Oromo": ("om", "orm"),
    "Ossetian": ("os", "oss"),
    "Panjabi": ("pa", "pan"),
    "Pashto": ("ps", "pus"),
    "Persian": ("fa", "per", "fas"),
    "Polish": ("pl", "pol"),
    "Portuguese": ("pt", "por"),
    "Pāli": ("pi", "pli"),
    "Quechua": ("qu", "que"),
    "Romansh": ("rm", "roh"),
    "Romanian": ("ro", "rum", "ron"),
    "Russian": ("ru", "rus"),
    "Samoan": ("sm", "smo"),
    "Sango": ("sg", "sag"),
    "Sanskrit": ("sa", "san"),
    "Sardinian": ("sc", "srd"),
    "Scottish Gaelic": ("gd", "gla"),
    "Serbian": ("sr", "scc", "srp"),
    "Shona": ("sn", "sna"),
    "Sindhi": ("sd", "snd"),
    "Sinhalese": ("si", "sin"),
    "Slovak": ("sk", "slo", "slk"),
    "Slovenian": ("sl", "slv"),
    "Somali": ("so", "som"),
    "South Ndebele": ("nr", "nbl"),
    "Southern Sotho": ("st", "sot"),
    "Spanish": ("es", "spa"),
    "Sundanese": ("su", "sun"),
    "Swahili": ("sw", "swa"),
    "Swati": ("ss", "ssw"),
    "Swedish": ("sv", "swe"),
    "Tagalog": ("tl", "tgl"),
    "Tahitian": ("ty", "tah"),
    "Tajik": ("tg", "tgk"),
    "Tamil": ("ta", "tam"),
    "Tatar": ("tt", "tat"),
    "Telugu": ("te", "tel"),
    "Thai": ("th", "tha"),
    "Tibetan": ("bo", "tib", "bod"),
    "Tigrinya": ("ti", "tir"),
    "Tonga": ("to", "ton"),
    "Tsonga": ("ts", "tso"),
    "Tswana": ("tn", "tsn"),
    "Turkish": ("tr", "tur"),
    "Turkmen": ("tk", "tuk"),
    "Twi": ("tw", "twi"),
    "Ukrainian": ("uk", "ukr"),
    "Urdu": ("ur", "urd"),
    "Uyghur": ("ug", "uig"),
    "Uzbek": ("uz", "uzb"),
    "Venda": ("ve", "ven"),
    "Vietnamese": ("vi", "vie"),
    "Volapük": ("vo", "vol"),
    "Walloon": ("wa", "wln"),
    "Welsh": ("cy", "wel", "cym"),
    "Western Frisian": ("fy", "fry"),
    "Wolof": ("wo", "wol"),
    "Xhosa": ("xh", "xho"),
    "Yiddish": ("yi", "yid"),
    "Yoruba": ("yo", "yor"),
    "Zhuang": ("za", "zha"),
    "Zulu": ("zu", "zul"),
}

LANG_NAMES = {code: name for name, codes in _LANGUAGES.items() for code in codes}


def language_name(code: str | None) -> str | None:
    norm = (code or "").strip().lower()
    if not norm or norm in UNKNOWN_LANGS:
        return None
    return LANG_NAMES.get(norm, norm)


def _dedupe(labels: list[str]) -> list[str]:
    counts = Counter()
    out = []
    for lab in labels:
        counts[lab] += 1
        n = counts[lab]
        out.append(lab if n == 1 else f"{lab} {n}")
    return out


def audio_labels(langs: list[str]) -> list[str]:
    return _dedupe([language_name(c) or "Original" for c in langs])


def text_label(lang: str, forced: bool = False, sdh: bool = False) -> str:
    base = language_name(lang) or "Original"
    if forced:
        base += " (Forced)"
    if sdh:
        base += " (SDH)"
    return base


def text_labels(tracks: list[tuple[str, bool, bool]]) -> list[str]:
    return _dedupe([text_label(lang, f, s) for lang, f, s in tracks])
