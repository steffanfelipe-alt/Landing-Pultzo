# Pultzo, "La revolución" v6: landing brief

Self-authored under explicit creative delegation, on 2026-10-14. The user asked
for a new version that follows the written critique ("Crítica de la landing de
Pultzo", Claude Docs) with two exceptions, and to use scroll-craft. Their words:

> "con esta critica, haceme una nueva version de la landing mejorada, manteniendo la escencia del branding"

> "me gusta esto de la seleccion, sin embargo me gustaria seguir con la foto de
> steve jobs, que incorpora el excel en las masas, y la del avion, quiero
> mantener la escencia de la revolucion, segui todo lo de la critica menos eso"

"Esto de la selección" is the tabbed module viewer from v5. It stays.

Evidence comes from the critique, the live repo (steffanfelipe-alt/Landing-Pultzo,
index.html + funciones.html) and prior session notes. Assumptions are marked.

## The subject

Pultzo: dental clinic management with AI, for Argentine clinics with a team
(several professionals, a front desk). The page's single job: get the owner to
write on WhatsApp for a 20 minute demo. One CTA label everywhere: "Pedí una demo".

Hard facts that bound the copy:

- Never deployed to a real clinic. No testimonials, no counts, no logos, no
  percentages. Screens carry fictional data and say so.
- WhatsApp handles appointments only, never health data (funciones.html).
- Obras sociales: aranceles con copago, presentación mensual, no direct
  integration yet (funciones.html).
- Comprobantes read by AI, a person confirms with one click (funciones.html).
- AI integrations get the minimum, no training on clinic data (funciones.html).
- Voice dictation stays in the clinic (current landing copy).
- Brand tokens of the current landing: ground #0E0D0B, ink #F4F1EA, soft
  #C9C2B4, accent #FF7A55, Archivo (display) + Geist (text). Archive photography
  with credits.

Unconfirmed (flag to the user): "Mar del Plata"; "diez clínicas fundadoras",
"los primeros meses sin costo", "precio fundador".

## The eight topics

1. **Vibe.** Authored from the existing brand: archival, editorial, warm dark,
   confident. References: a museum's photo archive at night; a printed
   almanac; the Apple "1984" era press kit.
2. **Journey, from the critique.** Value first (hero promise + CTA), the pain in
   their words, the short history ending "Con Pultzo, no.", real screens ordered
   by what costs the most, the cost in pesos, trust, founding-clinic offer, FAQ,
   final CTA. The user's exception: Jobs 1984 and the 1903 flight stay.
3. **Energy.** Authored: medium open (value), low (pain is quiet and specific),
   rising through the eras, the loudest beat at the cut to "Con Pultzo, no.",
   calm working surface, a second smaller lift at the first flight, quiet close.
4. **Feeling and the one moment.** See the curve and the peak below.
5. **Something no other site does.** Authored: the pending pile. The things that
   keep the owner up at night are collected in a corner while they read, and
   the product clears them one by one. They leave with an empty list.
6. **Range.** Editorial, dark. Kept because it is the brand.
7. **One world or scenes.** Distinct scenes, hard grounds, no drift.
8. **Assets.** The repo's archive photos (1937, 1946, 1984, 1987, 1903) and six
   real product screenshots. No generation, no API key, no spend.

## Grammar: "Lista de pendientes" (new)

The page is one evening's to-do list being cleared.

- **Nav:** the pending pile itself. A fixed list (a chip on phones) that fills
  as the pain is named and empties as the product handles each item. Each item
  is a link that jumps to the screen that resolves it.
- **Sequence:** items are added (pain), the argument for why tools never took
  them off your plate (history), then they are resolved (product), priced
  (money), made safe (trust), and offered (founders).
- **Ending:** the list is empty and says the real time. One CTA.
- **Bans:** scrub video, drift gradients (hard grounds only), section counters,
  spotlight, magnet, centred copy as a default, more than one eyebrow per three
  sections, a scroll cue.

Why the other grammars lost: filmic one-shot needs footage and hides seams this
page wants. Chaptered editorial forbids a media hero and pinned type, both of
which the revolution sequence needs. Live surface forbids the archive
photography that is the brand. Continuous world needs geography. Typographic
poster forbids photos. Gallery has no argument. Split stage cannot hold the
tabs, calculator and FAQ. Cutlist is the wrong pulse for a cautious buyer.

## Feeling curve (written before the acts)

1. **Relief, glimpsed.** The promise: "Vos atendés pacientes. Pultzo hace el
   resto." over the 1937 records office, messages floating forward.
2. **Recognition, with unease.** Four things from tonight, with the real clock.
   Each one drops into the pile in the corner as it is read.
3. **Weight, then the turn (PEAK).** 1946, 1984, 1987 wipe over each other while
   the year rolls; "Cambió la herramienta. El trabajo siguió siendo tuyo." The
   frame cuts to black and the year reads "Hoy": "Con Pultzo, no."
4. **Control.** The real screens. Opening a tab clears its item from the pile.
5. **Sobriety.** The empty chair in pesos, with their own numbers.
6. **Trust.** Calm, specific facts about the data and the setup.
7. **Belonging.** The first flight: "Toda revolución empezó con pocos." Ten
   founding clinics.
8. **Resolve.** Questions answered, then the empty list and the time. Demo.

Peak, as a visitor would say it: "the years kept rolling, 1946, 1984, 1987, and
then everything went black, the year said Hoy, and it said: Con Pultzo, no."
Lives in the eras act, which has the largest span on the page.

Tell-someone sentence: "It's the site where the things I had pending tonight
piled up in the corner, and they disappeared one by one while I looked at the
product."

Authored silence: the black frame right before "Con Pultzo, no." (about 0.06
of the eras act). Intentional.

## Score

| Beat | Device | Why |
|---|---|---|
| Promise | pin 1.3 + parallax planes (photo far, copy mid, messages near) | Depth and a readable promise on screen one |
| Pain | flow + in, rows feed the pile | Quiet, read at your own pace |
| History and turn (peak) | pin 4.0 + full-bleed reveal wipes + kinetic + rolling year | The argument needs held breath; the cut needs silence before it |
| Screens | flow + tabs (pointer) | Operating something, not watching |
| Cost | pin 1.3, kinetic heading, live calculator | Short hold so the number is the only thing |
| Trust | flow + in | Information, compressed |
| Founders | pin 1.8, a slow push-in on the 1903 photo, kinetic line, then the offer | The second, smaller lift |
| FAQ | flow | Administrative, compressed |
| Close | pin 1.2, hold cues, empty pile | The page arrives and stops |

Device families: pin, flow+in, parallax, reveal, kinetic, pointer. Never the
same act device twice in a row. No scrub. 9 acts, about 14.5 viewport-heights:
longer than the reference band because the critique adds sections
(calculator, trust, FAQ) that stay compressed.

## Fingerprint gate

Against `pultzo (2026-09-22)`: grammar differs (pending list vs object stage),
nav differs (pending pile vs product sidebar with a guided cursor), hero
differs (layered archive photo with floating messages vs wordmark over a closed
laptop), sequence differs (alternating pin/flow, 9 acts vs one persistent object
over 7 acts), close differs (empty list with live time, CTA in place vs hard cut
to dark with two contact buttons), signature differs. 6 of 6.

## Revision 2 (same day): the user's direction

> "no me gusta esto los pendientes y los mensajes en el aire, despues saca las
> balizas del inicio en el nombre de pultzo, y gestion odontologica. asi debe
> quedar las partes de las tres fotos, cambio la herramienta, el trabajo siguio
> siendo tuyo. el inicio me gusta que figure asi con la letra bien grande y el
> texto de pulzo de esa manera, la CTA arriba o al costado"

- The pending pile is gone, and with it the "Lista de pendientes" grammar. The
  page is now a filmic sequence with hard grounds: no nav beyond a bar that
  appears after the hero (mark + CTA).
- No floating messages, no pulsing dots anywhere.
- Hero: the 1937 photo full-bleed and dimmed, "Pultzo" set large with the
  spaced line "Gestión odontológica con inteligencia artificial", the CTA beside
  it, the headline very large ("Vos atendés pacientes. Pultzo hace el resto.").
  The user rejected the near plane, so depth is now the photo's slow push-in
  against fixed copy only.
- Eras: the three photos wipe over each other, then settle side by side as a
  triptych with year and name over each third, dimmed, and "Cambió la
  herramienta. El trabajo siguió siendo tuyo." over it. Then the cut to black,
  the year reads "Hoy": "Con Pultzo, no." Signature move: the triptych assembly
  with the rolling year that lands on "Hoy".
