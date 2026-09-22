# Pultzo Admin, landing brief

Interviewed in conversation on 2026-09-22. User answers are quoted verbatim
(Spanish, as given). Where the user delegated a decision, the authored choice is
labelled `Authored`. Evidence about the product comes from the product's own
codebase (`apps/web/src/features/app-shell/dashboard-nav-items.ts`,
`metrics-config/`, `globals.css`) and from prior session notes.

## The subject

Pultzo Admin: a SaaS for running a dental clinic. Agenda, WhatsApp assistant
that books appointments on its own, automatic patient follow-up, and a panel of
indicators derived from the agenda. Audience: the owner or manager of a small
dental clinic in Argentina. The page's single job: get that person to write on
WhatsApp or by email to ask for a demo.

Hard facts that bound the copy:

- The product has never been deployed to a real clinic. No customer counts, no
  testimonials, no logos, no percentages. Sample data inside the demo screens is
  labelled as fictional on the surface itself.
- Clinical records are out of scope. The five indicators come from the agenda.
- Google Calendar integration is free/busy only. Not claimed on the page.
- Brand tokens are the product's own: Inter, canvas `#f7f6f2`, ink `#17181a`,
  soft ink `#5b5f66`, success `#0b6e4f`, error `#c2410c`, dark rail `#17181a`
  with `#b9bcc2` text, radius 4px, tight negative tracking on display type.

## The eight topics

1. **Vibe.** Authored (the brief pins the direction without naming it): calm,
   precise, monochrome, "Apple keynote for a consultorio". References: the
   product's own dashboard; a MacBook product page; a clean dental office at
   8 am before the first patient.

2. **Scroll journey, in the user's words.**
   > "mi idea es que el viaje comienze con la pantalla principal, que diga
   > PULTZO en grande, todo siempre respetando las fuentes y paletas. Y con un
   > asset de una macbook cerrada, acostada en horizontal debajo de la palabra
   > pultzo, la compu debe ser 3D. al scrollear hacia abajo, esta se abrira y
   > mostrara la primera funcion, resaltando el outcome de ella y como ayudaria
   > a mejorar la gestion."
   > "Mostra las funciones clave y que mas cambian la gestion de la clinica"
   > "podes resaltar que nosotros nos encargamos de todo el onboarding de la
   > configuracion de la cuenta, migracion de datos en caso de que se necesite"
   > "disena la pagina de forma que sea un 'embudo' hacia el final para el
   > visitante"

3. **Energy curve.** Authored: quiet open, one rise (the lid), a plateau of
   working screens with one louder moment (the assistant booking at night), a
   quiet promise (onboarding), then a hard cut to dark for the close.

4. **Feeling, stage by stage, and the one moment.** Authored, see the curve
   below. The user delegated this explicitly:
   > "descubri la forma en la que podes hacer sentir e incentivar al cliente a
   > que continue bajando y viendo las funciones"

5. **The one thing no site they have seen does.** In the user's words:
   > "en cuanto a un capricho de diseno me gustaria que luego de que la compu se
   > abra, al bajar a las siguientes funciones, un cursor se dirija a la
   > siguiente funcion y la clickee, para pasar a esa."

6. **Aesthetic range.** Authored: premium-minimal, because the brand tokens are
   already monochrome and the brief asks for a 3D laptop under a giant
   wordmark. Not chosen by default: chosen because the user said "respetando las
   fuentes y paletas" and those tokens are quiet.

7. **One world or distinct scenes.** Authored: one object. The laptop is the
   only stage and it persists from the hero to the end of the tour. Not a
   worldflight (no camera travel), not chapters (no cuts between grounds until
   the close).

8. **Assets they have.** None supplied. No photography, no footage, no logo
   file. The wordmark is typeset in Inter like the product's own rail. The laptop
   is built in CSS 3D so the screen is real markup, not an image. No generated
   imagery; the page needs no API key.

Contact, in the user's words:
> "pone mail, y whatsapp, mi numero de whatsapp es 54 9 223 541 2083, y mi mail
> es steffanfelipe@gmail.com"

## Grammar

**Object stage** (new grammar, constraints below). One physical object holds
the whole tour; the page is that object's lid opening and its screen being
operated. Navigation is the product's own sidebar inside the screen, driven by
a guided cursor and clickable by the visitor. The hero is the wordmark with the
object closed beneath it. The close is the funnel's tip: the object leaves, the
column narrows, the ground inverts, two contact actions hold.

Forbids: scrub video, photography, full-bleed media, kinetic headline stacks,
card grids, section counters, any second stage object. Copy sits beside the
object, never over it.

Why the other grammars lost: filmic one-shot wants a full-bleed scrub hero and
corner-anchored copy, and there is no footage. Live surface forbids the giant
wordmark hero the user asked for. Chaptered editorial cuts grounds between
chapters, which breaks the one-object continuity. Continuous world needs camera
travel through a place. Typographic poster forbids the product surface.
Gallery has no argument. Split stage needs two sides in tension. Cutlist is the
wrong pulse for a clinic.

## Revision 3 (same day): items, order, mobile window

The user asked for the functions to read as items that accumulate while
scrolling, the assistant first, the agenda second, a nicer onboarding, and a
mobile design that stops looking like a tablet. What changed:

- Tour order: assistant (peak, 3.2) → agenda (2.2) → seguimiento (2.0) → panel
  (2.0). The lid opens onto the Panel, the product's real home, and the tour
  ends back there.
- Every act is a heading plus three or four outcome items on staggered cues
  that hold until the act ends, so the list builds under the hand. Each item is
  paired with a beat on the surface: a message landing, confirmed cards
  stepping forward, the "Reservar un turno" dialog, a counter ticking, a tile
  ringing. Beats can send the cursor to press something (`data-cursor`).
- Onboarding is a four-step sequence on a hairline (a real sequence, so the
  numbers carry information), revealed as one object.
- Phone: the laptop keeps real 16:10 proportions and lives only in the hero.
  As the hero ends the app node moves out of the lid into a flat window at the
  top of the viewport and renders at 1:1 in its compact layout; the copy takes
  the band below. Same DOM, same state, same cursor.

## Revision 4 (same day): no empty slide before the first function

The user felt the first function took too much scroll, and some copy ended up
under the machine. Both had one cause: the hero and the assistant were two
pinned acts, so a full viewport of un-pin slide sat between the lid opening
and the first heading. They are now one act (span 4.4): the lid opens in the
first quarter, the machine settles by a third, the heading fades in at 0.34 and
the cursor has already pressed Conversaciones. `data-tour-at` / `data-beat-from`
/ `data-beat-to` key the view switch and the beats to that act's later
progress. On desktop the laptop is now posed so the deck's left edge (which
reaches further left than the screen, in perspective) sits flush to the right
of the copy column, and the scale is capped so the screen stays inside the
viewport. The copy can no longer be covered at any width.

## Journey

```
1  Recognition   the name, the machine, nothing moving yet
2  Surprise      the lid rises under the hand and the screen lights up: today's agenda
3  Recognition   their own day, ordered, who confirmed and who did not
4  Awe           23:14, a patient writes, the assistant answers and books (PEAK)
5  Relief        nobody gets lost: the follow-up list updates itself
6  Control       the panel says who is drifting away before it is late
7  Trust         "you set up nothing": account, professionals, migration, done by us
8  Resolve       dark ground, one line, two ways to write
```

## Feeling curve (one line per act)

| Act | Feeling | What on screen causes it |
|---|---|---|
| hero | calm, then surprise | PULTZO at 19vw over a closed laptop; the lid opens as you scroll and occludes the word; the Panel is on screen |
| bot (peak) | awe | the cursor clicks Conversaciones; a WhatsApp thread plays line by line under the wheel while four outcomes stack up; a toast lands: appointment reserved |
| agenda | recognition | the cursor clicks Agenda; their own Tuesday; confirmed cards step forward; the cursor presses Reservar and a dialog opens |
| seguimiento | relief | the cursor clicks Seguimiento; a row goes out, two rows resolve by themselves, the counters tick |
| panel | control | the cursor clicks Panel; a tile rings under "cada número abre la lista"; then the machine recedes and leaves |
| onboarding | trust | plain type in a narrower column; a four-line list wipes in: what we do so they do nothing |
| close | resolve | hard cut to the dark rail colour; one heading, two buttons, held |

No two adjacent acts share a feeling.

## The peak

> "Bajé y vi cómo el asistente le contestó a una paciente a las once de la
> noche, le ofreció horarios y el turno apareció solo en la agenda."

Lives in the bot act. Largest span on the page (3.4vh against 1.7 to 2.0 for the
others). The silence before it is authored: the agenda copy fades at p 0.92, the
stage slides for a viewport with only the laptop on screen while the cursor
travels to Conversaciones, and the thread is empty until the first message
lands at p 0.06 of the bot act.

## Tell-someone sentence

It's the site where the laptop opens when you scroll and a cursor gives you the
tour, clicking through the app by itself.

## Signature move

The guided cursor. A real DOM cursor inside the screen travels to the next
sidebar item, presses it, and the view switches, in sync with the act you are
scrolling into. Scrolling back runs it in reverse. The sidebar is also real
navigation: clicking an item scrolls the page to that act. Not a kit device; page
JS reading each act's `--sc-p`.

## Fingerprint gate

`~/dashboard-demo/FINGERPRINTS.md` is empty. First build in this workspace,
nothing to clear. Row appended after verification.

## Authored silence

- The un-pin slide between every two tour acts: laptop only, cursor moving.
- The bot act from p 0 to 0.06: thread open, no messages yet.

## Score

| Act | Device | Span | Why |
|---|---|---|---|
| hero | `pin` + page-local 3D pose from `--sc-p`; wordmark recedes on a far plane | 1.7 | the lid opening is the hook and it must be scrubbed by the hand; shortened on review so the first screen costs under a viewport of scroll |
| agenda | `pin` + cue | 1.6 | copy crosses while the surface holds |
| bot | `pin` + three crossing cues + thread lines keyed to `--sc-p` | 3.4 | the peak needs room and a settle |
| seguimiento | `pin` + cue + row states keyed to `--sc-p` | 1.6 | same surface, different feeling: things resolve without you |
| panel | `pin` + cue; the object recedes and exits at p 0.72 to 1 | 2.0 | the tour ends with the machine leaving, and the shrinking object is the funnel narrowing |
| onboarding | `flow` + `in` stagger + one big `reveal="left"` on the list | ~1.3 | administrative content, compressed, but the list wipes in as one object |
| close | `pin`, greet-and-hold cue, `magnet` on the primary button, dark ground | 1.4 | the funnel's tip resolves and holds |

Families: pin, flow/in, reveal, parallax (hero planes: wordmark, shadow,
laptop), pointer (magnet). Total about 12.6 viewport-heights across seven acts,
outside the 13.6 to 13.8 band the skill flags.

The four screens were rebuilt against screenshots of the running product
(`lab/ref/`): every page opens with a display title and a grey summary line,
the rail carries line icons and the white "P" mark, and the agenda is the
product's timeline (date title, turnos summary, Hoy and date navigation,
Reservar un turno, per-professional chips, columns with count and hours, cards
with a status stripe and the time range above the name). The panel act is 2.0 rather than
1.6 because the machine's exit lives inside it.

A lid-closing exit was built first and rejected on the contact sheet: with the
hinge at the bottom of the open screen, closing swings the light screen face
toward the camera and it reads as a grey slab rising from the floor. Receding
keeps the physics honest and draws the funnel.

## Mobile art direction

Below 860px the laptop's virtual screen is 400 x 600 (portrait), so the app
renders in a compact layout with a bottom tab strip the cursor can still
press. The closed machine sits under a 21vw wordmark; open, the screen fills
82vw at the top of the viewport and the copy takes the lower band. Base tilt
increases to 80 degrees so the deck costs little height.
