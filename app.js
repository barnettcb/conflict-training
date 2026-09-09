const VERSION = '0.2.0';
const DB_NAME = 'ConflictTrainingDB';
const DB_VERSION = 1;
const STORE = 'state';
const STATE_KEY = 'app-state';
const AUTO_LOCK_MS = 5 * 60 * 1000;

const DEFAULT_STATE = {
  route: 'course',
  currentLesson: 'F1',
  completed: {},
  fields: {},
  quizzes: {},
  security: { pinSet:false, pinSalt:'', pinHash:'' },
  updatedAt: null
};

const FOUNDATION_LESSONS = [
  {
    id:'F1',
    section:'foundation',
    title:'What Mindfulness Is',
    subtitle:'Learn the basic attention skill that supports awareness, choice, and effective responding.',
    badges:['Standard DBT foundation','Mindfulness'],
    body:`
      <section class="card"><div class="card-header"><div class="section-kicker">Start from zero</div><div class="section-title">Mindfulness is a way of paying attention</div></div><div class="card-body copy">
        <p>In standard DBT, mindfulness means intentionally bringing attention to what is happening in the present moment. It is the opposite of moving through experience entirely on automatic pilot. The aim is not to force the mind to become blank. Thoughts, emotions, sensations, memories, and urges can all be present while mindfulness is being practiced.</p>
        <p>Mindfulness matters in conflict because many unhelpful reactions happen quickly. A person may notice an urge to interrupt, a tightening in the body, a judgment, or the beginning of an answer before there has been a deliberate decision to act. Training attention makes those moments easier to notice.</p>
        <div class="callout key"><strong>Training target:</strong> notice present experience clearly enough that automatic behavior becomes more visible and choice becomes more available.</div>
      </div></section>

      <section class="card"><div class="card-header"><div class="section-kicker">Standard DBT map</div><div class="section-title">What skills and How skills</div></div><div class="card-body copy">
        <p>Standard DBT organizes core mindfulness into two groups. The <strong>What skills</strong> describe what a person does when practicing mindfulness. The <strong>How skills</strong> describe the attitude or manner used while doing it.</p>
        <div class="grid-2">
          <div class="mini-card"><div class="mini-title">What skills</div><strong>Observe</strong> what is happening. <strong>Describe</strong> what is noticed. <strong>Participate</strong> fully in the current activity.</div>
          <div class="mini-card"><div class="mini-title">How skills</div>Practice <strong>nonjudgmentally</strong>, <strong>one-mindfully</strong>, and <strong>effectively</strong>.</div>
        </div>
        <p>This foundation will concentrate first on observing, describing, and one-mindful attention because they are directly relevant to detecting activation and listening during conflict.</p>
      </div></section>

      <section class="card"><div class="card-header"><div class="section-kicker">What mindfulness is not</div><div class="section-title">Common misunderstandings</div></div><div class="card-body copy">
        <ul>
          <li><strong>Not thought suppression:</strong> noticing a thought is different from making the thought disappear.</li>
          <li><strong>Not relaxation training:</strong> relaxation can occur, but calmness is not the test of whether mindfulness is working.</li>
          <li><strong>Not agreement:</strong> observing an idea or another person's words does not mean endorsing them.</li>
          <li><strong>Not passive:</strong> mindfulness can lead to firm, direct action. The key is that the action is noticed and chosen rather than purely automatic.</li>
          <li><strong>Not perfect concentration:</strong> attention will wander. Returning attention is part of the practice.</li>
        </ul>
      </div></section>

      <section class="card"><div class="card-header"><div class="section-kicker">RO-DBT distinction</div><div class="section-title">Related foundation, different emphasis</div></div><div class="card-body copy">
        <p>RO-DBT also teaches mindfulness, but it modifies the standard DBT framework to emphasize openness, fallibility, social signaling, and willingness to learn. Later RO-DBT lessons use names such as <strong>Observe Openly</strong>, <strong>Describe with Integrity</strong>, and <strong>Participate Without Planning</strong>, and add attitudes such as one-mindful awareness and humility.</p>
        <p>This course will not treat the two systems as identical. For now, the important shared foundation is simple: attention can be trained, experience can be noticed before it is explained, and a person can return attention to the present when the mind wanders.</p>
      </div></section>

      <section class="card"><div class="card-header"><div class="section-kicker">Technique</div><div class="section-title">A two-minute attention anchor</div></div><div class="card-body copy">
        <ol>
          <li>Choose one neutral anchor: the sensation of breathing, contact of the feet with the floor, or sounds in the room.</li>
          <li>Place attention on that anchor for a short period.</li>
          <li>When attention moves to a thought, memory, plan, sensation, or sound, notice that it moved.</li>
          <li>Without criticizing yourself, bring attention back to the chosen anchor.</li>
          <li>Repeat every time attention wanders.</li>
        </ol>
        <div class="callout key"><strong>The repetition is the training.</strong> Wandering is not failure. Noticing the wandering and returning is the skill being strengthened.</div>
      </div></section>
    `,
    practice:{
      intro:'Complete three short attention-anchor practices. One to three minutes is enough for the first pass. The goal is to notice attention moving and practice returning it.',
      records:3,
      fields:[
        {key:'anchor',label:'What did you use as the attention anchor?',type:'select',options:['','Breathing','Feet/body contact','Sounds','Another neutral sensation']},
        {key:'wander',label:'What most often pulled attention away?',hint:'Examples: planning, a sound, a thought, an emotion, physical discomfort, or another sensation.',type:'textarea'},
        {key:'return',label:'What did you notice when you returned attention?',type:'textarea',optional:true}
      ]
    },
    quiz:[
      {q:'What is the main purpose of the attention-anchor practice?',options:['Keep the mind completely blank','Notice when attention wanders and practice returning it','Become relaxed as quickly as possible'],correct:1,explain:'Mindfulness practice trains noticing and returning. A wandering mind is expected.'},
      {q:'Does mindfulness require agreeing with a thought or another person?',options:['Yes','No'],correct:1,explain:'Observing an experience is not the same as endorsing it.'},
      {q:'If attention wanders ten times and is returned ten times, did the practice fail?',options:['Yes','No'],correct:1,explain:'Each return is part of the practice.'}
    ],
    resources:[
      {title:'Jennifer May, PhD — DBT Mindfulness Intro',url:'https://www.youtube.com/watch?v=AjKi81uqHK0',note:'Free clinician-created introduction to mindfulness and why it is useful.'},
      {title:'DBT Mindfulness Skills Training resource index',url:'https://jamesfitzgeraldtherapy.com/dbt-mindfulness-skills-training/',note:'Free index of mindfulness lessons and Jennifer May videos.'}
    ],
    refs:'Standard DBT: Mindfulness Handouts 1-5 in Linehan. RO-DBT comparison: Skills Manual Lessons 12-14. This lesson provides a common attentional foundation without treating the two models as interchangeable.'
  },
  {
    id:'F2',
    section:'foundation',
    title:'Observe & Describe',
    subtitle:'Practice separating what is directly noticed from the explanation or interpretation added afterward.',
    badges:['Standard DBT foundation','RO-DBT bridge'],
    body:`
      <section class="card"><div class="card-header"><div class="section-kicker">Observe</div><div class="section-title">Notice before explaining</div></div><div class="card-body copy">
        <p>In standard DBT, <strong>Observe</strong> means intentionally noticing present experience. The target can be external, such as a sound or facial expression, or internal, such as a physical sensation, thought, emotion, image, or urge.</p>
        <p>Observation is deliberately simple. “My jaw tightened” is an observation. “My jaw tightened because this person is disrespecting me” adds an interpretation. The interpretation may eventually be useful, but it is a different mental event.</p>
      </div></section>

      <section class="card"><div class="card-header"><div class="section-kicker">Describe</div><div class="section-title">Put observations into words</div></div><div class="card-body copy">
        <p><strong>Describe</strong> means putting what was observed into words without automatically treating the description as an absolute fact about motives, causes, or meaning.</p>
        <div class="grid-2">
          <div class="mini-card"><div class="mini-title">Closer to observation</div>“The person looked away while I was speaking.”<br>“I noticed a thought that I was being ignored.”<br>“I felt heat in my face.”</div>
          <div class="mini-card"><div class="mini-title">Adds interpretation</div>“The person looked away because they do not care.”<br>“They were deliberately ignoring me.”<br>“My anger proves they were unfair.”</div>
        </div>
        <p>The goal is not to eliminate interpretation. Human beings constantly interpret. The skill is learning to recognize the difference.</p>
      </div></section>

      <section class="card"><div class="card-header"><div class="section-kicker">RO-DBT bridge</div><div class="section-title">Describe with Integrity</div></div><div class="card-body copy">
        <p>RO-DBT later teaches a related practice called <strong>Describe with Integrity</strong>. Its Awareness Continuum asks the learner to take ownership of inner experience by identifying sensations, emotions, images, or thoughts without immediately explaining, rationalizing, or defending them.</p>
        <p>The conflict value is straightforward: “I am noticing anger” leaves more room for examination than “You made me angry because you are trying to provoke me.” The first statement identifies experience. The second bundles experience together with a causal interpretation.</p>
        <div class="callout key"><strong>Course principle:</strong> first separate observation from interpretation. Later lessons will teach how to evaluate interpretations and communicate effectively.</div>
      </div></section>

      <section class="card"><div class="card-header"><div class="section-kicker">Practice drill</div><div class="section-title">Three layers</div></div><div class="card-body copy">
        <p>Use an ordinary event and identify three layers:</p>
        <ol><li><strong>External observation:</strong> what could a camera or microphone have captured?</li><li><strong>Internal observation:</strong> what sensation, thought, emotion, image, or urge appeared?</li><li><strong>Interpretation:</strong> what meaning did the mind add?</li></ol>
        <p>All three can matter. The training is learning not to confuse them.</p>
      </div></section>
    `,
    practice:{
      intro:'Use three ordinary experiences. They can be pleasant, unpleasant, social, or nonsocial. Separate direct observation from the interpretation that followed.',
      records:3,
      fields:[
        {key:'event',label:'What happened externally?',hint:'Describe what a camera or microphone could have captured.',type:'textarea'},
        {key:'internal',label:'What did you notice internally?',hint:'A sensation, thought, emotion, image, or urge.',type:'textarea'},
        {key:'meaning',label:'What interpretation or meaning did your mind add?',type:'textarea'},
        {key:'difference',label:'What is the difference between the observation and the interpretation?',type:'textarea',optional:true}
      ]
    },
    quiz:[
      {q:'Which statement is closest to a direct observation?',options:['“She does not respect me.”','“She looked at her phone while I was speaking.”','“She wanted me to feel unimportant.”'],correct:1,explain:'The phone behavior is directly observable. Respect and motive are interpretations.'},
      {q:'Is an interpretation automatically wrong because it is an interpretation?',options:['Yes','No'],correct:1,explain:'The point is to distinguish it from direct observation, not automatically reject it.'},
      {q:'Which statement best separates inner experience from blame?',options:['“You made me furious.”','“I notice anger and an urge to answer immediately.”'],correct:1,explain:'The second identifies internal experience without automatically assigning causation.'}
    ],
    resources:[
      {title:'Jennifer May, PhD — DBT Mindfulness What Skills',url:'https://www.youtube.com/watch?v=TlrIi3V50Qs',note:'Free review of Observe, Describe, and Participate.'},
      {title:'DBT Mindfulness Skills Training resource index',url:'https://jamesfitzgeraldtherapy.com/dbt-mindfulness-skills-training/',note:'Free supporting material for the standard DBT mindfulness module.'}
    ],
    refs:'Standard DBT: Mindfulness Handouts 4-4c. RO-DBT bridge: Handout 12.1, Describe with Integrity / Awareness Continuum. Course examples are paraphrased and expanded for stand-alone instruction.'
  },
  {
    id:'F3',
    section:'foundation',
    title:'One-Mindful Attention',
    subtitle:'Learn to notice when attention leaves the current task and practice bringing it back.',
    badges:['Standard DBT foundation','RO-DBT bridge'],
    body:`
      <section class="card"><div class="card-header"><div class="section-kicker">The problem of divided attention</div><div class="section-title">Being physically present is not the same as attending</div></div><div class="card-body copy">
        <p>Standard DBT's <strong>one-mindful</strong> skill means doing one thing at a time and bringing attention back to the current activity when it wanders. This does not require perfect concentration. It requires repeatedly noticing where attention went.</p>
        <p>In conversation, divided attention often takes the form of listening to words while simultaneously planning a reply, reviewing evidence, rehearsing a defense, checking a phone, or mentally moving to another topic. The body may remain in the conversation while attention has partly left it.</p>
      </div></section>

      <section class="card"><div class="card-header"><div class="section-kicker">Attention is trainable</div><div class="section-title">Notice → name → return</div></div><div class="card-body copy">
        <div class="grid-3">
          <div class="mini-card"><div class="mini-title">Notice</div>Recognize that attention has moved away from the chosen task.</div>
          <div class="mini-card"><div class="mini-title">Name</div>Use a brief label if helpful: “planning,” “judging,” “remembering,” “answer-building,” “worrying.”</div>
          <div class="mini-card"><div class="mini-title">Return</div>Bring attention back to the present task without arguing with the distraction.</div>
        </div>
        <p>This is the same basic repetition practiced in F1, now applied to ordinary activities and conversations.</p>
      </div></section>

      <section class="card"><div class="card-header"><div class="section-kicker">RO-DBT bridge</div><div class="section-title">With one-mindful awareness</div></div><div class="card-body copy">
        <p>RO-DBT later teaches <strong>with one-mindful awareness</strong>: intentionally turning attention toward the present moment while recognizing that complete awareness is impossible. RO-DBT also connects this skill with slowing down rather than compulsively speeding up, multitasking, or moving immediately to the next goal.</p>
        <p>For conflict training, that emphasis is useful because urgency itself can become an attentional cue. Feeling that a statement must be answered immediately can pull attention away from receiving new information.</p>
      </div></section>

      <section class="card"><div class="card-header"><div class="section-kicker">Everyday practice</div><div class="section-title">Use ordinary tasks first</div></div><div class="card-body copy">
        <p>Choose a routine activity such as making coffee, showering, walking from one room to another, washing dishes, or listening to a short piece of music. Do only that activity for a few minutes. Each time attention moves elsewhere, notice it and return.</p>
        <p>Training on neutral activities lowers the difficulty. The same attentional move will later be used when the distraction is emotionally charged.</p>
      </div></section>
    `,
    practice:{
      intro:'Complete three short one-mindful practices during ordinary activities. The target is not perfect concentration; it is noticing distraction and returning to the chosen activity.',
      records:3,
      fields:[
        {key:'activity',label:'What activity did you choose?',type:'textarea'},
        {key:'pull',label:'What most often pulled attention away?',type:'textarea'},
        {key:'label',label:'What brief label, if any, helped you notice the distraction?',hint:'Examples: planning, worrying, judging, remembering, answer-building.',type:'textarea',optional:true},
        {key:'return',label:'What was it like to bring attention back?',type:'textarea',optional:true}
      ]
    },
    quiz:[
      {q:'What does one-mindful practice require?',options:['Never becoming distracted','Doing one thing at a time and returning when attention wanders','Ignoring all thoughts and emotions'],correct:1,explain:'Attention wandering is expected. The skill is repeated return.'},
      {q:'During a conversation, mentally rehearsing a reply while the other person is still speaking is an example of:',options:['One-mindful attention','Divided attention','Perfect listening'],correct:1,explain:'Part of attention has shifted from receiving the current message to preparing a response.'},
      {q:'Does one-mindful awareness mean a person can become completely aware of everything happening?',options:['Yes','No'],correct:1,explain:'Both practical mindfulness and RO-DBT recognize limits on awareness.'}
    ],
    resources:[
      {title:'Jennifer May, PhD — DBT Mindfulness How Skills',url:'https://www.youtube.com/watch?v=1vWsgg9JiDo',note:'Free review of nonjudgmentally, one-mindfully, and effectively.'},
      {title:'DBT Mindfulness Skills Training resource index',url:'https://jamesfitzgeraldtherapy.com/dbt-mindfulness-skills-training/',note:'Free supporting mindfulness material.'}
    ],
    refs:'Standard DBT: Mindfulness Handouts 5 and 5b. RO-DBT bridge: Handout 14.1 and Worksheet 14.A on one-mindful awareness.'
  },
  {
    id:'F4',
    section:'foundation',
    title:'Mindfulness in Interaction',
    subtitle:'Apply present-moment attention while another person is speaking without yet trying to solve the interaction.',
    badges:['Integrated foundation','Interpersonal application'],
    body:`
      <section class="card"><div class="card-header"><div class="section-kicker">From solo practice to interaction</div><div class="section-title">Two streams of information are present</div></div><div class="card-body copy">
        <p>Interpersonal mindfulness requires attention to both <strong>what is happening in the interaction</strong> and <strong>what is happening inside the listener</strong>. The challenge is that internal reactions can become so strong that they replace attention to the other person's actual message.</p>
        <div class="grid-2">
          <div class="mini-card"><div class="mini-title">External stream</div>Words, tone, pacing, facial expression, gestures, pauses, and other directly observable behavior.</div>
          <div class="mini-card"><div class="mini-title">Internal stream</div>Thoughts, sensations, emotions, images, urges, judgments, memories, and plans.</div>
        </div>
        <p>The goal is not to monitor everything at once. The goal is to notice when the internal stream begins to crowd out the external one.</p>
      </div></section>

      <section class="card"><div class="card-header"><div class="section-kicker">A common attentional shift</div><div class="section-title">Listening → answer-building</div></div><div class="card-body copy">
        <p>One of the most important interaction cues is the moment attention moves from trying to understand the message to preparing what to say next. That shift can happen in friendly conversation, meetings, feedback, disagreements, or conflict.</p>
        <div class="callout key"><strong>Retrieval question:</strong> Am I trying to understand what this person means, or am I already preparing my answer?</div>
        <p>This question does not demand agreement. It identifies the current task being performed by attention.</p>
      </div></section>

      <section class="card"><div class="card-header"><div class="section-kicker">Observation versus inference</div><div class="section-title">Do not confuse mind-reading with listening</div></div><div class="card-body copy">
        <p>During interaction, people naturally make inferences about motives, feelings, and intentions. Mindfulness adds a useful check: <strong>What did I actually observe, and what did I infer?</strong></p>
        <div class="grid-2">
          <div class="mini-card"><div class="mini-title">Observed</div>“The person spoke more loudly.”<br>“There was a long pause.”<br>“They said they were frustrated.”</div>
          <div class="mini-card"><div class="mini-title">Inferred</div>“They are trying to intimidate me.”<br>“The pause means they do not care.”<br>“They are exaggerating.”</div>
        </div>
        <p>The inference may later prove accurate or inaccurate. Mindfulness simply keeps the categories separate.</p>
      </div></section>

      <section class="card"><div class="card-header"><div class="section-kicker">Low-stakes interaction drill</div><div class="section-title">Attend, notice, return</div></div><div class="card-body copy">
        <ol>
          <li>Choose an ordinary conversation that is not highly charged.</li>
          <li>Give the speaker your attention for a short period without multitasking.</li>
          <li>Notice when attention moves into planning, judgment, memory, or self-focus.</li>
          <li>Briefly label the shift internally.</li>
          <li>Return attention to the speaker's current words.</li>
        </ol>
        <p>Module 2 will later teach the formal standard DBT skill <strong>Mindfulness of Others</strong> in depth. This foundation only establishes the attentional behavior needed before that lesson.</p>
      </div></section>
    `,
    practice:{
      intro:'Use three ordinary, low-stakes conversations. Practice noticing when attention leaves the speaker and bringing it back. Do not try to evaluate the whole relationship or solve a disagreement.',
      records:3,
      fields:[
        {key:'context',label:'What was the general interaction?',hint:'Keep the description brief and non-identifying if preferred.',type:'textarea'},
        {key:'pull',label:'What pulled your attention away from the speaker?',type:'textarea'},
        {key:'observed',label:'What did you directly observe when you returned attention?',type:'textarea'},
        {key:'inference',label:'What interpretation or inference did you notice?',type:'textarea',optional:true},
        {key:'return',label:'Were you able to return attention to the current interaction?',type:'select',options:['','Yes','Partly','Not yet']}
      ]
    },
    quiz:[
      {q:'Which statement best describes interpersonal mindfulness?',options:['Analyze the other person continuously','Attend to the interaction while also noticing when internal reactions pull attention away','Agree with the other person so the conversation stays calm'],correct:1,explain:'The skill concerns attention and awareness, not agreement or constant analysis.'},
      {q:'“They raised their voice because they wanted to dominate me” contains:',options:['Only direct observation','An observation plus an inference','No information at all'],correct:1,explain:'Raised voice is observable; the motive is inferred.'},
      {q:'What should happen when you notice that you are preparing your answer while the other person is still speaking?',options:['Criticize yourself for failing','Return attention to the current message','Immediately give the prepared answer'],correct:1,explain:'The practice is to notice the shift and return.'}
    ],
    resources:[
      {title:'Jennifer May, PhD — DBT Mindfulness What Skills',url:'https://www.youtube.com/watch?v=TlrIi3V50Qs',note:'Review of observing, describing, and participating.'},
      {title:'Jennifer May, PhD — DBT Mindfulness How Skills',url:'https://www.youtube.com/watch?v=1vWsgg9JiDo',note:'Review of one-mindfulness and effectiveness.'}
    ],
    refs:'Standard DBT mindfulness principles provide the primary foundation. RO-DBT later adds Describe with Integrity and one-mindful awareness. Formal DBT Mindfulness of Others is intentionally deferred to Module 2.'
  }
];


const LESSONS = [
  {
    section:'module1',
    id: '1.1',
    title: 'Detecting Activation',
    subtitle: 'Learn to notice meaningful shifts in cue, body, attention, emotion, and social behavior.',
    badges: ['RO-DBT primary', 'Foundational'],
    body: `
      <section class="card"><div class="card-header"><div class="section-kicker">Why this matters</div><div class="section-title">Awareness often begins after the reaction has started</div></div><div class="card-body copy">
        <p>Before someone can choose a different response, there has to be some awareness that a response is happening. That sounds obvious, but emotional reactions often begin before a person has a clear verbal explanation of what they are feeling.</p>
        <p>RO-DBT offers a useful starting model. It describes emotionally relevant events as <strong>cues</strong>. A cue can come from outside the body, from inside the body, or from the surrounding context. The nervous system can react quickly, and that reaction may show up in physical sensations, attention, urges, facial expression, tone of voice, posture, or behavior before the person has named an emotion.</p>
        <div class="callout key"><strong>Training target:</strong> become better at noticing that something has changed. The goal is not perfect emotional insight. Earlier awareness is useful, but a late catch still creates a choice point.</div>
      </div></section>

      <section class="card"><div class="card-header"><div class="section-kicker">Core concept</div><div class="section-title">The five broad classes of emotionally relevant cues</div></div><div class="card-body copy">
        <p>In RO-DBT's neuroregulatory model, the nervous system is described as continuously scanning for five broad classes of emotionally relevant information. These categories are broader than conflict and are useful for understanding emotional responding in everyday life.</p>
        <div class="grid-2">
          <div class="mini-card"><div class="mini-title">Safety cues</div>Signals associated with protection, connection, care, belonging, or security. A familiar supportive person, a relaxed environment, or feeling accepted can function as safety cues.</div>
          <div class="mini-card"><div class="mini-title">Novelty cues</div>Something unexpected or discrepant that prompts orienting and evaluation. A sudden sound, surprising news, an unfamiliar situation, or an unexpected change can trigger this response.</div>
          <div class="mini-card"><div class="mini-title">Reward cues</div>Signals associated with possible pleasure, success, or goal attainment. A desired opportunity, praise, progress toward a goal, or an enjoyable activity can increase energy and approach behavior.</div>
          <div class="mini-card"><div class="mini-title">Threat cues</div>Signals appraised as potentially dangerous, harmful, damaging, or requiring defense. Conflict, criticism, a harsh tone, physical danger, or perceived rejection may function as threat cues.</div>
          <div class="mini-card"><div class="mini-title">Overwhelming cues</div>Situations experienced as too much to manage through ordinary approach or defensive responding. The response may involve shutting down, going numb, becoming very still, or feeling detached.</div>
        </div>
        <p>The important point is not to memorize a biological theory. It is to recognize that different kinds of cues can produce different patterns in the body and behavior, often quickly.</p>
      </div></section>

      <section class="card"><div class="card-header"><div class="section-kicker">Detection model</div><div class="section-title">Cue → body → social signal</div></div><div class="card-body copy">
        <p>RO-DBT Worksheet 2.A teaches awareness by looking at three places where a response can be detected.</p>
        <div class="grid-3">
          <div class="mini-card"><div class="mini-title">1. Cue</div>What happened? The cue might be an external event, an internal memory or image, a bodily sensation, or a contextual factor such as time, setting, or fatigue.</div>
          <div class="mini-card"><div class="mini-title">2. Body</div>What changed physically? Examples include relaxation, alertness, increased energy, tension, heat, agitation, changes in breathing, or feeling numb or slowed down.</div>
          <div class="mini-card"><div class="mini-title">3. Social signal</div>What changed in visible behavior? Examples include easy or difficult eye contact, changes in facial expression, a more easygoing or more strident tone, tighter gestures, increased talkativeness, becoming very still, or finding it harder to listen.</div>
        </div>
        <p>These are <strong>observation points</strong>, not diagnoses. A single cue does not prove what emotion is present or whether a reaction is justified.</p>
      </div></section>

      <section class="card"><div class="card-header"><div class="section-kicker">Common places to notice change</div><div class="section-title">A broad detection inventory</div></div><div class="card-body copy">
        <p>The examples below are deliberately broad. They are not a checklist that every person should experience, and they are not limited to conflict.</p>
        <div class="table-wrap"><table><thead><tr><th>Detection channel</th><th>Examples</th></tr></thead><tbody>
          <tr><td><strong>Situation or cue</strong></td><td>Unexpected criticism, disagreement, a sudden sound, good news, a memory, a change of plans, being interrupted, seeing something pleasant, an unfamiliar setting.</td></tr>
          <tr><td><strong>Body</strong></td><td>Tension, warmth, agitation, slower or faster breathing, increased energy, becoming unusually still, feeling heavy, numb, or detached.</td></tr>
          <tr><td><strong>Face and voice</strong></td><td>Expression becoming more open or more constrained, staring or looking away, tone becoming easier, sharper, flatter, louder, quieter, faster, or slower.</td></tr>
          <tr><td><strong>Behavior</strong></td><td>Approaching, withdrawing, talking more, becoming silent, interrupting, correcting, defending, freezing, reaching out, smiling, avoiding eye contact.</td></tr>
          <tr><td><strong>Attention</strong></td><td>Curiosity, scanning for danger, difficulty listening, narrowing onto one detail, mentally rehearsing a response, missing information, becoming highly focused.</td></tr>
          <tr><td><strong>Emotion or urge</strong></td><td>Contentment, curiosity, excitement, irritation, anxiety, urge to approach, urge to escape, urge to argue, urge to shut down.</td></tr>
        </tbody></table></div>
      </div></section>

      <section class="card"><div class="card-header"><div class="section-kicker">Technique</div><div class="section-title">Detect, then describe simply</div></div><div class="card-body copy">
        <p>When a noticeable shift occurs, start with a plain description rather than an explanation.</p>
        <div class="definition"><span class="term">Observation:</span> “My shoulders tightened.”</div>
        <div class="definition"><span class="term">Observation:</span> “I became much more alert.”</div>
        <div class="definition"><span class="term">Observation:</span> “My speech got faster.”</div>
        <div class="definition"><span class="term">Observation:</span> “I stopped listening and started preparing an answer.”</div>
        <p>At this stage, avoid adding conclusions such as “this proves the other person is attacking me” or “this means my reaction is irrational.” The first job is to notice what is actually happening.</p>
        <div class="callout warning"><strong>Avoid hypervigilance.</strong> This lesson is not asking anyone to monitor their body and other people continuously. The goal is to become more familiar with a few reliable signs of state change.</div>
      </div></section>

      <section class="card"><div class="card-header"><div class="section-kicker">Application to conflict</div><div class="section-title">Early catches and late catches both count</div></div><div class="card-body copy">
        <p>In conflict, the earliest available cue might be physical: tension, heat, a change in breath, or a hardening facial expression. But sometimes awareness arrives later and the first thing noticed is behavioral: talking faster, interrupting, correcting, defending, becoming silent, or mentally building a rebuttal.</p>
        <div class="grid-2">
          <div class="mini-card"><div class="mini-title">Early catch</div>“Something about that statement changed my state. My face tightened and I felt irritated.”</div>
          <div class="mini-card"><div class="mini-title">Late catch</div>“I am already talking louder and trying to prove my point.”</div>
        </div>
        <div class="callout key"><strong>Standing rule for this course:</strong> catch it wherever you catch it. The next lesson will teach how to identify a more specific defensive shift, and later lessons will teach what to do once the shift is noticed.</div>
      </div></section>
    `,
    practice: {
      intro: 'During the next several days, notice three occasions when your emotional or physical state changes noticeably. The situations can be pleasant, unpleasant, social, nonsocial, expected, or unexpected. The purpose is simply to practice detection.',
      records: 3,
      fields: [
        {key:'what', label:'What happened?', hint:'Briefly describe the cue or situation.', type:'textarea'},
        {key:'first', label:'What was the first change you noticed?', hint:'Examples: tension, warmth, increased energy, faster breathing, becoming quiet, wanting to respond immediately, curiosity, irritation, difficulty listening, urge to move toward or away.', type:'textarea'},
        {key:'channel', label:'Where did you notice it first?', type:'select', options:['','Body','Face or voice','Behavior','Attention','Emotion or urge','Other / not sure']},
        {key:'after', label:'Optional: What else did you notice shortly afterward?', type:'textarea', optional:true}
      ]
    },
    quiz: [
      {q:'Which statement best captures the goal of this lesson?', options:['Identify the exact emotion before any behavior occurs','Notice meaningful changes in cue, body, attention, or behavior so a choice point becomes more available','Decide whether every emotional reaction is justified','Monitor physical sensations continuously'], correct:1, explain:'Detection does not require perfect early emotion labeling. The goal is to notice useful signs of state change.'},
      {q:'A person notices halfway through a disagreement that their speech has become faster and they are interrupting. Does that count as detection?', options:['No, because the first cue was missed','Yes, because a late behavioral catch still creates a possible intervention point'], correct:1, explain:'Earlier is useful, but later awareness is still usable.'},
      {q:'Which is the best first description?', options:['“My shoulders tightened.”','“This proves the other person is attacking me.”','“I am definitely in the wrong.”'], correct:0, explain:'Start with observation before interpretation.'}
    ],
    resources: [
      {title:'Jennifer May, PhD — RO-DBT Lesson 2: Understanding Emotions', url:'https://www.youtube.com/watch?v=fkEJXu-SxLw', note:'Free clinician-created explanation of the five categories of emotionally relevant cues.'}
    ],
    refs:'RO-DBT Skills Training Manual: Handout 2.1, Handout 2.2, Worksheet 2.A. Course language is paraphrased and expanded for instruction.'
  },
  {
    section:'module1',
    id: '1.2',
    title: 'Recognizing the Defensive Shift',
    subtitle: 'Learn the difference between having a position and becoming automatically closed to new information.',
    badges: ['RO-DBT primary', 'Conflict application'],
    body: `
      <section class="card"><div class="card-header"><div class="section-kicker">Start from zero</div><div class="section-title">What is Fixed Mind?</div></div><div class="card-body copy">
        <p>RO-DBT uses the term <strong>Fixed Mind</strong> for a state in which a person behaves as though change, reconsideration, or further information is unnecessary because the answer is already known. The important feature is not simply confidence. It is a narrowing of openness to feedback or disconfirming information.</p>
        <p>Fixed Mind can show up during ordinary disagreements, performance feedback, relationship conflict, decisions, or situations where identity, competence, fairness, or values feel challenged. It can also occur in low-emotion settings.</p>
        <div class="callout key"><strong>Important:</strong> Fixed Mind is not the same as “being wrong.” A person can be factually correct and still become rigid, defensive, or unable to listen. A firm response can also be appropriate in some situations. The skill is about flexibility and learning, not automatic surrender.</div>
      </div></section>

      <section class="card"><div class="card-header"><div class="section-kicker">Common indicators</div><div class="section-title">How a closed state can become visible</div></div><div class="card-body copy">
        <p>RO-DBT's Lesson 11 materials ask learners to watch for several signs that openness may be narrowing:</p>
        <ul>
          <li>Wanting to explain, defend, justify, dismiss, or discount feedback automatically.</li>
          <li>A noticeable change in speech rate or a strong urge to respond immediately.</li>
          <li>Physical tension or a sense of being threatened.</li>
          <li>Irritation, anger, embarrassment, resentment, frustration, or indignation.</li>
          <li>A strong internal certainty that further examination is unnecessary.</li>
        </ul>
        <p>These are cues to <strong>check openness</strong>, not instructions to assume the feedback is true.</p>
      </div></section>

      <section class="card"><div class="card-header"><div class="section-kicker">Conflict translation</div><div class="section-title">The shift from receiving information to making a case</div></div><div class="card-body copy">
        <p>During conflict, a defensive shift often becomes easier to see through behavior than through emotion labels. Several common responses can serve different purposes but still pull attention away from receiving new information:</p>
        <div class="grid-2">
          <div class="mini-card"><div class="mini-title">Explain</div>Add context, reasons, or background so the action makes sense.</div>
          <div class="mini-card"><div class="mini-title">Correct</div>Fix something that seems inaccurate, unfair, incomplete, or mischaracterized.</div>
          <div class="mini-card"><div class="mini-title">Defend</div>Protect intent, competence, motives, character, or prior choices.</div>
          <div class="mini-card"><div class="mini-title">Blame or counterattack</div>Shift the focus toward what the other person did first, caused, misunderstood, or did wrong.</div>
        </div>
        <p>None of these is inherently inappropriate. The warning sign is <strong>automaticity</strong>: the response starts before the person has decided whether that response is useful now.</p>
      </div></section>

      <section class="card"><div class="card-header"><div class="section-kicker">Attention</div><div class="section-title">Answer-building is itself a cue</div></div><div class="card-body copy">
        <p>A person can appear quiet while already being fully engaged in rebuttal. One useful question is therefore about the task attention is performing:</p>
        <div class="callout key"><strong>Am I trying to understand what this person means, or am I already preparing my answer?</strong></div>
        <p>Preparing an answer is not morally wrong. The question simply detects whether attention has left the listening task. Later modules will train listening and disagreement more fully.</p>
      </div></section>

      <section class="card"><div class="card-header"><div class="section-kicker">Technique</div><div class="section-title">Name the process, not the verdict</div></div><div class="card-body copy">
        <p>Use a short internal description of the process that is occurring:</p>
        <div class="grid-3">
          <div class="mini-card">“Explaining.”</div><div class="mini-card">“Correcting.”</div><div class="mini-card">“Defending.”</div><div class="mini-card">“Blaming.”</div><div class="mini-card">“Answer-building.”</div><div class="mini-card">“Certainty rising.”</div>
        </div>
        <p>This creates a small separation between <em>having</em> the urge and immediately <em>acting</em> on it. The next lesson adds a formal behavioral brake.</p>
        <div class="callout warning"><strong>Do not weaponize the concept.</strong> Fixed Mind is a self-observation tool. It is not a label to apply to another person during an argument.</div>
      </div></section>
    `,
    practice:{
      intro:'Use three mild disagreements, feedback situations, or realistic rehearsals. The goal is to identify the first sign that receiving information is shifting into automatic defense or answer-building.',
      records:3,
      fields:[
        {key:'situation',label:'Briefly describe the situation or feedback.',type:'textarea'},
        {key:'firstshift',label:'What was the first sign of the defensive shift?',hint:'A thought, urge, body cue, behavior, speech change, or attentional shift.',type:'textarea'},
        {key:'pattern',label:'Which process was most noticeable?',type:'select',options:['','Explaining','Correcting','Defending','Blaming / counterattacking','Answer-building','Strong certainty / dismissing','Other / not sure']},
        {key:'noticed',label:'What did you notice once you named the process?',type:'textarea',optional:true}
      ]
    },
    quiz:[
      {q:'What does noticing a Fixed Mind cue establish?',options:['That the feedback is true','That the person is wrong','That openness may be narrowing and it may be useful to slow down and examine the process','That disagreement should stop'],correct:2,explain:'The cue is about openness and process, not a verdict on the content.'},
      {q:'Which is the best example of a defensive-shift label?',options:['“The other person is unfair.”','“Answer-building.”','“I must be wrong.”'],correct:1,explain:'A process label stays close to what the mind or behavior is doing.'},
      {q:'Can a person be factually correct while responding from a rigid or defensive state?',options:['Yes','No'],correct:0,explain:'Content accuracy and response flexibility are separate questions.'}
    ],
    resources:[
      {title:'Jennifer May, PhD — YouTube channel',url:'https://www.youtube.com/@jennifermayph.d.2761',note:'Clinician-created RO-DBT and standard DBT teaching. Use the RO-DBT mindfulness / states-of-mind lessons as supplemental instruction when available.'}
    ],
    refs:'RO-DBT Skills Training Manual: Handouts 11.1-11.4 and Worksheet 11.A. Introduced here because the material directly supports conflict-cue detection.'
  },
  {
    section:'module1',
    id:'1.3',
    title:'STOP — Interrupt the Next Behavior',
    subtitle:'Learn a standard DBT crisis-survival skill as a brief behavioral brake.',
    badges:['Standard DBT primary','Acute skill'],
    body:`
      <section class="card"><div class="card-header"><div class="section-kicker">Background</div><div class="section-title">What distress-tolerance skills are for</div></div><div class="card-body copy">
        <p>Standard DBT includes a group of skills called <strong>distress tolerance</strong>. Their immediate purpose is not to solve every underlying problem. In a high-pressure moment, they are used to tolerate distress and avoid making the situation worse through impulsive action.</p>
        <p>STOP is one of these crisis-survival skills. It is especially useful when emotion or urgency is pushing behavior forward faster than deliberate choice.</p>
        <div class="callout key"><strong>Training target:</strong> create a small interruption between an urge and the next action.</div>
      </div></section>

      <section class="card"><div class="card-header"><div class="section-kicker">The skill</div><div class="section-title">S — T — O — P</div></div><div class="card-body copy">
        <div class="grid-2">
          <div class="mini-card"><div class="mini-title">S — Stop</div>Interrupt automatic movement into the next response. In conversation, this may be as small as not saying the next sentence immediately.</div>
          <div class="mini-card"><div class="mini-title">T — Take a step back</div>Create a little space. This can be physical or mental. It does not require leaving the room. A person might stop speaking for a beat, lean back, or release the impulse to move forward immediately.</div>
          <div class="mini-card"><div class="mini-title">O — Observe</div>Notice what is happening inside and outside: body state, urges, attention, behavior, and the actual situation.</div>
          <div class="mini-card"><div class="mini-title">P — Proceed mindfully</div>Choose the next action based on what is effective rather than simply restarting the impulse that was interrupted.</div>
        </div>
      </div></section>

      <section class="card"><div class="card-header"><div class="section-kicker">Course adaptation</div><div class="section-title">STOP is reusable after the reaction has already started</div></div><div class="card-body copy">
        <p>People often imagine a coping skill only “counts” if it is used before any mistake occurs. That is not how this course will treat STOP.</p>
        <div class="grid-3">
          <div class="mini-card">One reactive sentence escaped → <strong>interrupt sentence two.</strong></div>
          <div class="mini-card">One interruption happened → <strong>interrupt the next interruption.</strong></div>
          <div class="mini-card">Volume already rose → <strong>interrupt the next increase.</strong></div>
        </div>
        <p>The goal is to <strong>shorten the chain</strong>. A late STOP can still prevent further escalation.</p>
      </div></section>

      <section class="card"><div class="card-header"><div class="section-kicker">Observe</div><div class="section-title">Keep the O small enough to use</div></div><div class="card-body copy">
        <p>When activation is high, a long analysis may be unrealistic. Use three simple observation targets:</p>
        <ol><li><strong>What am I doing?</strong></li><li><strong>What is my body doing?</strong></li><li><strong>Where is my attention?</strong></li></ol>
        <div class="callout key"><strong>Useful conflict question:</strong> Am I trying to understand what this person means, or am I already preparing my answer?</div>
      </div></section>

      <section class="card"><div class="card-header"><div class="section-kicker">What STOP is not</div><div class="section-title">Avoid common misunderstandings</div></div><div class="card-body copy">
        <ul>
          <li><strong>Not agreement:</strong> pausing an automatic response does not force a change in beliefs.</li>
          <li><strong>Not permanent silence:</strong> the final step is to proceed.</li>
          <li><strong>Not withdrawal:</strong> a STOP can occur while remaining present and engaged.</li>
          <li><strong>Not perfect calm:</strong> a person may still be angry or upset and use the skill effectively.</li>
          <li><strong>Not a full timeout:</strong> a longer structured break is a separate skill that will be taught later.</li>
        </ul>
      </div></section>

      <section class="card"><div class="card-header"><div class="section-kicker">Rehearsal</div><div class="section-title">Build procedural familiarity before high-intensity use</div></div><div class="card-body copy">
        <p>Skills are harder to retrieve under pressure when they have only been read about. Rehearse STOP with progressively more activating prompts.</p>
        <div class="grid-3">
          <div class="mini-card"><div class="mini-title">Level 1</div>A neutral disagreement: “I don't think that's correct.”</div>
          <div class="mini-card"><div class="mini-title">Level 2</div>Mild criticism: “You weren't listening.”</div>
          <div class="mini-card"><div class="mini-title">Level 3</div>An inaccurate characterization or frustrating piece of feedback that creates a real urge to answer quickly.</div>
        </div>
        <p>Do not start with the most painful or provocative material. The first goal is making the sequence familiar.</p>
      </div></section>
    `,
    practice:{
      intro:'Complete three STOP rehearsals or real-life practices. Mild situations are appropriate. The main outcome is whether STOP interrupted the next automatic behavior.',
      records:3,
      fields:[
        {key:'prompt',label:'What was the situation or practice prompt?',type:'textarea'},
        {key:'catchpoint',label:'When did you notice the need for STOP?',type:'select',options:['','Before reacting','As the reaction started','After one or more reactive behaviors','Not sure']},
        {key:'hardest',label:'Which STOP step felt hardest?',type:'select',options:['','Stop','Take a step back','Observe','Proceed mindfully','Not sure']},
        {key:'next',label:'What happened to the next behavior?',hint:'For example: delayed it, changed it, interrupted it, or continued automatically.',type:'textarea'},
        {key:'worked',label:'Did STOP interrupt the next automatic escalation?',type:'select',options:['','Yes','Partly','No / not yet']}
      ]
    },
    quiz:[
      {q:'What is the immediate purpose of STOP?',options:['Solve the entire problem','Prove which person is right','Interrupt impulsive behavior long enough for a more deliberate response to become possible'],correct:2,explain:'STOP is a crisis-survival brake, not a complete conflict-resolution system.'},
      {q:'If a reactive sentence has already been said, is it too late to use STOP?',options:['Yes','No'],correct:1,explain:'A later STOP can still shorten the escalation sequence.'},
      {q:'Does “Take a step back” always mean physically leaving?',options:['Yes','No'],correct:1,explain:'In a conversation it can be a brief internal or behavioral step back while remaining present.'}
    ],
    resources:[
      {title:'Jennifer May, PhD — STOP Skills video',url:'https://www.youtube.com/watch?v=Od9GaNk9Clk',note:'Clinician-created standard DBT instruction.'},
      {title:'DBT Distress Tolerance resource index',url:'https://jamesfitzgeraldtherapy.com/dbt-distress-tolerance-skills-training/',note:'Indexes the Jennifer May STOP and TIPP videos and DBT handout topics.'},
      {title:'Official Guilford DBT supplementary materials',url:'https://www.guilford.com/dbt-manual',note:'Official information and digital resources for Linehan DBT handouts and worksheets.'}
    ],
    refs:'Standard DBT: Distress Tolerance Handout 4 and Worksheets 2/2a in Linehan. Course application to conflict is an educational integration.'
  },
  {
    section:'module1',
    id:'1.4',
    title:'Downshift Without Disengaging',
    subtitle:'Use body-based regulation and social signaling to regain behavioral choice while staying present.',
    badges:['RO-DBT primary','Standard DBT supplement','Custom integration'],
    body:`
      <section class="card"><div class="card-header"><div class="section-kicker">Why physiology matters</div><div class="section-title">Communication is affected by the state of the body</div></div><div class="card-body copy">
        <p>When activation rises, reasoning alone may not be enough. The body may already be supporting rapid defensive action: tension increases, breathing changes, response speed rises, facial expression hardens, and attention narrows.</p>
        <p>RO-DBT and standard DBT both include skills that work through physiology. They do so for somewhat different theoretical reasons, but both recognize that changing bodily patterns can make more effective behavior easier to access.</p>
        <div class="callout key"><strong>Training target:</strong> reduce activation enough to regain choice. The target is not emotional numbness or complete calm.</div>
      </div></section>

      <section class="card"><div class="card-header"><div class="section-kicker">RO-DBT</div><div class="section-title">Social safety and nonverbal signaling</div></div><div class="card-body copy">
        <p>RO-DBT teaches that social-safety cues are associated with a more relaxed, receptive, and socially engaged state. Lesson 3 includes the <strong>Big Three + 1</strong>, a set of nonverbal actions used to influence physiology and signal openness.</p>
        <p>The official components include a deeper breath, eyebrow movement, a warm closed-mouth smile, and leaning back when appropriate. Later interpersonal material also recommends slowing the pace and reducing pressure to solve everything immediately when tension is very high.</p>
        <div class="callout warning"><strong>Context matters.</strong> Nonverbal signals are interpreted socially. A smile that communicates warmth in one situation could be read as a smirk, mockery, or placation in another. This course teaches the official concept and then uses a more conservative conflict adaptation that emphasizes posture, facial softening, breathing, and pacing.</div>
      </div></section>

      <section class="card"><div class="card-header"><div class="section-kicker">Standard DBT</div><div class="section-title">Paced breathing and paired muscle relaxation</div></div><div class="card-body copy">
        <p>Standard DBT's TIP material includes several ways of changing high physiological arousal. For this conflict course, the most relevant components are <strong>paced breathing</strong> and <strong>paired muscle relaxation</strong>.</p>
        <p>Paced breathing means intentionally slowing the breath and allowing the exhale to be somewhat longer than the inhale. Paired muscle relaxation involves learning to release muscular tension while breathing out. Repetition matters because the goal is to make the release easier to retrieve under stress.</p>
        <p>Other TIP components are not part of this course's initial conflict drill. They have different practical and health considerations and are not necessary for the skill we are building here.</p>
      </div></section>

      <section class="card"><div class="card-header"><div class="section-kicker">Integrated technique</div><div class="section-title">Release → Exhale → Soften → Slow</div></div><div class="card-body copy">
        <p>The sequence below is a <strong>custom integration</strong> of RO-DBT social-safety concepts and standard DBT physiological regulation. It is not an official acronym from either treatment.</p>
        <div class="grid-2">
          <div class="mini-card"><div class="mini-title">Release</div>Let unnecessary tension drop from jaw, shoulders, hands, and posture. Reduce physical forward pressure if the body is bracing or leaning into the argument.</div>
          <div class="mini-card"><div class="mini-title">Exhale</div>Take a comfortable slower breath. Let the out-breath be a little longer than the in-breath without straining.</div>
          <div class="mini-card"><div class="mini-title">Soften</div>Reduce a hard or closed facial set. Stay visually present rather than becoming blank, hostile, or conspicuously withdrawn.</div>
          <div class="mini-card"><div class="mini-title">Slow</div>Reduce speech rate, response urgency, and volume. Allow a beat before the next sentence.</div>
        </div>
      </div></section>

      <section class="card"><div class="card-header"><div class="section-kicker">Success standard</div><div class="section-title">Regulation can work even when emotion remains</div></div><div class="card-body copy">
        <p>A person might use the downshift and still feel angry, hurt, embarrassed, or convinced that something is unfair. The skill has not failed if behavior becomes more deliberate.</p>
        <div class="callout success"><strong>Example:</strong> anger remains, but volume drops, interruptions stop, shoulders release, and the person can listen to the next sentence. That is a successful downshift.</div>
      </div></section>

      <section class="card"><div class="card-header"><div class="section-kicker">Common mistakes</div><div class="section-title">Keep regulation connected to effectiveness</div></div><div class="card-body copy">
        <ul>
          <li><strong>Trying to erase all emotion:</strong> this can turn regulation into another control struggle.</li>
          <li><strong>Looking disengaged:</strong> blankness, turning away, or shutting down may reduce stimulation while also signaling disconnection.</li>
          <li><strong>Performing the skill theatrically:</strong> exaggerated breathing or facial movements may feel unnatural. The eventual goal is subtle, usable regulation.</li>
          <li><strong>Waiting until calm to behave effectively:</strong> skillful behavior can begin before emotion has fully settled.</li>
        </ul>
      </div></section>
    `,
    practice:{
      intro:'Practice the four-part downshift three times. Start while calm, then use a mild activating prompt or ordinary frustrating situation. The goal is familiarity, not maximum relaxation.',
      records:3,
      fields:[
        {key:'situation',label:'What was the situation or practice prompt?',type:'textarea'},
        {key:'before',label:'Activation before practice',hint:'Use a simple 0-5 scale: 0 = very settled, 5 = very activated.',type:'select',options:['','0','1','2','3','4','5']},
        {key:'used',label:'Which parts did you practice?',type:'checks',options:['Release tension','Longer/slower exhale','Soften face/posture','Slow speech/response pace']},
        {key:'change',label:'What changed in the body or behavior?',type:'textarea'},
        {key:'after',label:'Activation after practice',type:'select',options:['','0','1','2','3','4','5']}
      ]
    },
    quiz:[
      {q:'What is the main target of downshifting?',options:['Become completely calm','Regain enough behavioral choice to respond more effectively','Make the other person calm down'],correct:1,explain:'The course is targeting behavioral flexibility, not total emotional elimination.'},
      {q:'Why is the full RO-DBT smile component not automatically required in every heated conflict?',options:['Because smiling is never useful','Because nonverbal signals are context-dependent and a smile can be interpreted differently in different interactions','Because RO-DBT does not include smiling'],correct:1,explain:'The official skill includes a warm closed-mouth smile, but social meaning depends on context.'},
      {q:'If anger remains but speech slows and interruption stops, has regulation necessarily failed?',options:['Yes','No'],correct:1,explain:'Behavioral choice can improve while emotion remains present.'}
    ],
    resources:[
      {title:'Jennifer May, PhD — TIPP Skills video',url:'https://www.youtube.com/watch?v=sd0OK8K0HDg',note:'Clinician-created standard DBT instruction covering TIP/TIPP skills.'},
      {title:'DBT Distress Tolerance resource index',url:'https://jamesfitzgeraldtherapy.com/dbt-distress-tolerance-skills-training/',note:'Includes STOP, TIPP, and paired muscle relaxation resources.'},
      {title:'Official Guilford DBT supplementary materials',url:'https://www.guilford.com/dbt-manual',note:'Official DBT handout/worksheet resource information.'}
    ],
    refs:'RO-DBT Skills Training Manual: Handout 3.1 and later Handout 17.1. Standard DBT: Distress Tolerance Handouts 6 and 6b. “Release → Exhale → Soften → Slow” is a custom course integration.'
  },
  {
    section:'module1',
    id:'1.5',
    title:'The Micro-Pause',
    subtitle:'Combine detection, STOP, and downshifting into a short sequence that can be used while remaining in the interaction.',
    badges:['Integrated practice','Custom protocol'],
    body:`
      <section class="card"><div class="card-header"><div class="section-kicker">Integration</div><div class="section-title">What a micro-pause is</div></div><div class="card-body copy">
        <p>A <strong>micro-pause</strong> is a brief interruption lasting seconds. The person remains in the interaction. It is different from a longer structured break or timeout.</p>
        <p>The micro-pause combines the first four lessons into one retrievable sequence. It is designed for situations where activation is rising but there is still enough capacity to remain engaged.</p>
        <div class="callout key"><strong>Purpose:</strong> stop automatic escalation long enough to regain choice and redirect attention.</div>
      </div></section>

      <section class="card"><div class="card-header"><div class="section-kicker">The sequence</div><div class="section-title">Catch → Stop → Release → Slow → Reorient</div></div><div class="card-body copy">
        <div class="grid-3">
          <div class="mini-card"><div class="mini-title">1. Catch</div>Notice any useful cue: tension, irritation, speech change, interruption, defensive urge, answer-building, or another reliable sign.</div>
          <div class="mini-card"><div class="mini-title">2. Stop</div>Do not automatically continue the next escalation behavior.</div>
          <div class="mini-card"><div class="mini-title">3. Release</div>Drop unnecessary muscular tension and physical forward pressure.</div>
          <div class="mini-card"><div class="mini-title">4. Slow</div>Use a slower exhale, softer posture, and reduced speech or response speed.</div>
          <div class="mini-card"><div class="mini-title">5. Reorient</div>Return attention to the actual interaction rather than remaining inside the planned rebuttal.</div>
        </div>
        <div class="callout key"><strong>Retrieval question:</strong> Am I trying to understand what this person means, or am I already preparing my answer?</div>
      </div></section>

      <section class="card"><div class="card-header"><div class="section-kicker">Late catches</div><div class="section-title">The sequence still works after escalation has begun</div></div><div class="card-body copy">
        <div class="table-wrap"><table><thead><tr><th>Where awareness begins</th><th>Possible micro-pause</th><th>What success looks like</th></tr></thead><tbody>
          <tr><td>Early irritation</td><td>Stop, exhale, release, listen</td><td>No automatic defensive sentence follows immediately.</td></tr>
          <tr><td>Already explaining</td><td>Stop adding detail and return attention</td><td>The explanation does not expand into a long case.</td></tr>
          <tr><td>Already interrupting</td><td>Stop the next interruption</td><td>The other person finishes the thought.</td></tr>
          <tr><td>Already loud or rapid</td><td>Release tension and lower pace/volume</td><td>Intensity stops increasing even if emotion remains.</td></tr>
          <tr><td>Already blamed or counterattacked</td><td>Do not add the next accusation</td><td>The chain is shortened rather than defended as inevitable.</td></tr>
        </tbody></table></div>
      </div></section>

      <section class="card"><div class="card-header"><div class="section-kicker">Primary metric</div><div class="section-title">Grade the skill by the next behavior</div></div><div class="card-body copy">
        <p>At this stage, do not grade success by whether the disagreement was resolved, whether the other person softened, whether everyone agreed, or whether the emotion disappeared.</p>
        <div class="callout success"><strong>Module 1 metric:</strong> Did I interrupt the next escalation behavior?</div>
        <p>Later modules will add listening, validation, disagreement, expression, structured breaks, repair, and problem solving. Module 1 only builds the ability to regain a small amount of choice.</p>
      </div></section>

      <section class="card"><div class="card-header"><div class="section-kicker">Practice ladder</div><div class="section-title">Increase difficulty gradually</div></div><div class="card-body copy">
        <ol>
          <li><strong>Neutral disagreement:</strong> a low-stakes difference of opinion.</li>
          <li><strong>Mild irritation:</strong> being interrupted, delayed, or misunderstood.</li>
          <li><strong>Criticism:</strong> feedback about not listening, not following through, or making a mistake.</li>
          <li><strong>Inaccurate characterization:</strong> someone describes motives, thoughts, or intentions in a way that feels wrong.</li>
          <li><strong>Realistic high-value material:</strong> only after the sequence is familiar at easier levels.</li>
        </ol>
        <p>At every level, the sequence remains the same: <strong>Catch → Stop → Release → Slow → Reorient.</strong></p>
      </div></section>

      <section class="card"><div class="card-header"><div class="section-kicker">What comes later</div><div class="section-title">Micro-pause is not the full break skill</div></div><div class="card-body copy">
        <p>A longer structured break requires additional training: deciding when continued conversation is no longer productive, asking for a pause without using it as escape, communicating continued connection, setting a reliable return, regulating during the break, and re-entering the conversation. That will be taught in a later high-intensity-conflict module.</p>
      </div></section>
    `,
    practice:{
      intro:'Complete three integrated micro-pause practices. Rehearsal is acceptable. Increase difficulty gradually rather than starting with the most intense situations.',
      records:3,
      fields:[
        {key:'scenario',label:'What was the situation or practice prompt?',type:'textarea'},
        {key:'cue',label:'What cue did you catch?',type:'textarea'},
        {key:'interrupt',label:'What next behavior were you trying to interrupt?',type:'textarea'},
        {key:'downshift',label:'What did you do to release or slow?',type:'textarea'},
        {key:'attention',label:'Where did you redirect attention?',type:'textarea'},
        {key:'success',label:'Did you interrupt the next escalation behavior?',type:'select',options:['','Yes','Partly','No / not yet']}
      ]
    },
    quiz:[
      {q:'How long is a micro-pause intended to last?',options:['Seconds, while remaining in the interaction','At least 20 minutes away from the interaction','Until the disagreement is forgotten'],correct:0,explain:'A micro-pause is the brief in-conversation integration skill. A structured break is separate.'},
      {q:'What is the main success metric for Module 1?',options:['Did everyone agree?','Did emotion disappear?','Did I interrupt the next escalation behavior?'],correct:2,explain:'Later modules address the broader interaction. Module 1 targets interruption and regained choice.'},
      {q:'If the first awareness comes after someone has already become loud or defensive, can the micro-pause still be used?',options:['Yes','No'],correct:0,explain:'The standing rule is to catch the process wherever awareness becomes available.'}
    ],
    resources:[
      {title:'Jennifer May, PhD — RO-DBT Lesson 2',url:'https://www.youtube.com/watch?v=fkEJXu-SxLw',note:'Review of cue and state detection.'},
      {title:'Jennifer May, PhD — STOP Skills',url:'https://www.youtube.com/watch?v=Od9GaNk9Clk',note:'Review of the behavioral brake.'},
      {title:'Jennifer May, PhD — TIPP Skills',url:'https://www.youtube.com/watch?v=sd0OK8K0HDg',note:'Review of body-based DBT regulation.'},
      {title:'Free Intro to PACT webinar',url:'https://www.thepactinstitute.com/intro-to-pact-webinar',note:'Optional broader supplement on arousal regulation and relationship processes. Not required for Module 1.'}
    ],
    refs:'This lesson is a custom integration of earlier course material. The micro-pause sequence is not an official RO-DBT or DBT acronym.'
  }
];

let state = structuredClone(DEFAULT_STATE);
let db = null;
let saveTimer = null;
let unlocked = false;
let pinMode = 'unlock';
let pinBuffer = '';
let firstPin = '';
let pinMessage = '';
let inactivityTimer = null;
let hiddenAt = null;
let practiceTimer = { interval:null, id:null, remaining:0, total:0, running:false };

const ALL_LESSONS = [...FOUNDATION_LESSONS, ...LESSONS];

function openDb(){
  return new Promise((resolve,reject)=>{
    const req=indexedDB.open(DB_NAME,DB_VERSION);
    req.onupgradeneeded=()=>{
      const d=req.result;
      if(!d.objectStoreNames.contains(STORE)) d.createObjectStore(STORE);
    };
    req.onsuccess=()=>resolve(req.result);
    req.onerror=()=>reject(req.error);
  });
}
function loadState(){
  return new Promise(resolve=>{
    try{
      const tx=db.transaction(STORE,'readonly');
      const req=tx.objectStore(STORE).get(STATE_KEY);
      req.onsuccess=()=>resolve(req.result || structuredClone(DEFAULT_STATE));
      req.onerror=()=>resolve(structuredClone(DEFAULT_STATE));
    }catch(_){ resolve(structuredClone(DEFAULT_STATE)); }
  });
}
function normalizeState(saved){
  const s={...structuredClone(DEFAULT_STATE), ...(saved||{})};
  s.completed={...(saved?.completed||{})};
  s.fields={...(saved?.fields||{})};
  s.quizzes={...(saved?.quizzes||{})};
  s.security={...structuredClone(DEFAULT_STATE.security), ...(saved?.security||{})};
  const validRoutes=['course','practice','resources','settings','lesson'];
  if(!validRoutes.includes(s.route)) s.route='course';
  if(!ALL_LESSONS.some(l=>l.id===s.currentLesson)) s.currentLesson='F1';
  return s;
}
function persist(){
  state.updatedAt=new Date().toISOString();
  clearTimeout(saveTimer);
  saveTimer=setTimeout(()=>{
    try{
      const tx=db.transaction(STORE,'readwrite');
      tx.objectStore(STORE).put(state,STATE_KEY);
    }catch(_){ }
  },180);
}
function immediateSave(){
  state.updatedAt=new Date().toISOString();
  return new Promise(resolve=>{
    try{
      const tx=db.transaction(STORE,'readwrite');
      tx.objectStore(STORE).put(state,STATE_KEY);
      tx.oncomplete=resolve;
      tx.onerror=resolve;
    }catch(_){ resolve(); }
  });
}
function escapeHtml(s=''){ return String(s).replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c])); }
function lessonById(id){ return ALL_LESSONS.find(l=>l.id===id) || ALL_LESSONS[0]; }
function sectionLessons(section){ return section==='foundation' ? FOUNDATION_LESSONS : LESSONS; }
function sectionName(section){ return section==='foundation' ? 'Foundation — Mindfulness & Attention' : 'Module 1 — Catch & Brake'; }
function completedIn(items){ return items.filter(l=>state.completed[l.id]).length; }
function completedCount(){ return completedIn(ALL_LESSONS); }
function percent(items){ return items.length ? Math.round((completedIn(items)/items.length)*100) : 0; }

function renderShell(content,active='course'){
  const count=completedCount();
  return `<div class="app-shell">
    <header class="topbar"><div class="topbar-row"><div class="brand-wrap"><div class="brand">Personal Conflict Training</div><div class="brand-sub">Mindfulness Foundation + Module 1 · v${VERSION}</div></div><div class="status-pill">${count}/${ALL_LESSONS.length} complete</div></div></header>
    <main class="content" id="main-content">${content}</main>
    <nav class="bottom-nav" aria-label="Primary"><div class="bottom-nav-inner">
      ${navBtn('course','▤','Course',active)}${navBtn('practice','◎','Practice',active)}${navBtn('resources','↗','Resources',active)}${navBtn('settings','⚙','Settings',active)}
    </div></nav>
  </div>`;
}
function navBtn(route,icon,label,active){ return `<button class="nav-btn ${active===route?'active':''}" data-route="${route}" type="button"><span class="nav-icon">${icon}</span>${label}</button>`; }
function lessonRows(items){
  return items.map(l=>`<button class="lesson-row ${state.completed[l.id]?'complete':''}" data-lesson="${l.id}" type="button"><div><div class="lesson-row-title">${escapeHtml(l.id)} — ${escapeHtml(l.title)}</div><div class="lesson-row-sub">${escapeHtml(l.subtitle)}</div></div><div class="checkmark">✓</div></button>`).join('');
}
function sectionCard(section,items,description){
  const pct=percent(items);
  return `<section class="card"><div class="card-header"><div class="section-kicker">${section==='foundation'?'Foundation':'Module 1'}</div><div class="section-title">${escapeHtml(sectionName(section).replace(/^.*?—\s*/,''))}</div></div><div class="card-body copy">
    <p>${escapeHtml(description)}</p>
    <div class="progress-wrap"><div class="progress-track"><div class="progress-bar" style="width:${pct}%"></div></div><div class="progress-meta"><span>${completedIn(items)} of ${items.length} lessons complete</span><span>${pct}%</span></div></div>
    <div class="lesson-list" style="margin-top:12px">${lessonRows(items)}</div>
  </div></section>`;
}
function renderCourse(){
  const next=ALL_LESSONS.find(l=>!state.completed[l.id]) || ALL_LESSONS[0];
  const totalPct=percent(ALL_LESSONS);
  return renderShell(`
    <h1 class="page-title">Core Conflict Skills Training</h1>
    <p class="page-lede">A stand-alone, source-grounded course that assumes no prior knowledge of RO-DBT, standard DBT, mindfulness, or relationship-skills terminology.</p>
    <section class="card"><div class="card-header"><div class="section-kicker">Course progress</div><div class="section-title">Foundation + first conflict module</div></div><div class="card-body copy">
      <p>Start with the mindfulness foundation. It teaches the attentional skills used throughout the conflict modules. Module 1 then applies that attention to activation, interruption, and downshifting.</p>
      <div class="progress-wrap"><div class="progress-track"><div class="progress-bar" style="width:${totalPct}%"></div></div><div class="progress-meta"><span>${completedCount()} of ${ALL_LESSONS.length} lessons complete</span><span>${totalPct}%</span></div></div>
      <div class="btn-row" style="margin-top:12px"><button class="btn primary" data-lesson="${next.id}" type="button">${completedCount()?`Continue ${escapeHtml(next.id)}`:'Start Foundation'}</button></div>
    </div></section>
    ${sectionCard('foundation',FOUNDATION_LESSONS,'Train present-moment attention, observation, description, one-mindful focus, and basic interpersonal attention before using those skills under conflict pressure.')}
    ${sectionCard('module1',LESSONS,'Detect activation wherever it becomes visible, recognize defensive shifts, use STOP, downshift without disengaging, and combine the skills into a micro-pause.')}
    <section class="card"><div class="card-header"><div class="section-kicker">Course design</div><div class="section-title">How the training is built</div></div><div class="card-body copy">
      <ul><li>Concepts are taught before the learner is asked to use them.</li><li>Practice worksheets are embedded in each lesson and save locally on this device.</li><li>Manual terminology is defined before it is used.</li><li>Examples include ordinary daily situations as well as interpersonal conflict.</li><li>Standard DBT and RO-DBT are labeled separately rather than blended into one model.</li><li>Custom integrations are identified as course adaptations.</li></ul>
      <div class="notice">This is educational skills training and does not replace treatment or diagnose the learner or another person.</div>
    </div></section>
  `,'course');
}
function renderLesson(id){
  const l=lessonById(id);
  state.currentLesson=l.id;
  state.route='lesson';
  persist();
  const section=l.section==='foundation'?'foundation':'module1';
  const body=`
    <button type="button" class="back-btn" data-route="course">← Back to Course</button>
    <div class="breadcrumb"><span>${escapeHtml(sectionName(section))}</span><span>›</span><span>${escapeHtml(l.id)}</span></div>
    <h1 class="page-title">${escapeHtml(l.id)} — ${escapeHtml(l.title)}</h1>
    <p class="page-lede">${escapeHtml(l.subtitle)}</p>
    <div class="badges">${l.badges.map(b=>`<span class="badge ${b.startsWith('RO-')?'ro':b.startsWith('Standard')?'dbt':b.startsWith('Custom')||b.includes('Integrated')?'custom':''}">${escapeHtml(b)}</span>`).join('')}</div>
    ${l.body}
    ${practiceSection(l)}
    ${quizSection(l)}
    ${resourcesSection(l)}
    <section class="card"><div class="card-header"><div class="section-kicker">Source map</div><div class="section-title">Where this lesson comes from</div></div><div class="card-body copy"><p>${escapeHtml(l.refs)}</p><p class="subtle">Manual references are provided by title and handout/worksheet number so the learner can use a copy they already have. This app does not link to a purchase page for the RO-DBT manual.</p></div></section>
    <section class="card"><div class="card-header"><div class="section-kicker">Completion</div></div><div class="card-body">
      <label class="complete-box"><input type="checkbox" data-complete="${l.id}" ${state.completed[l.id]?'checked':''}><span><strong>Mark ${escapeHtml(l.id)} complete</strong><br><span class="subtle">Use this after reviewing the teaching, practice worksheet, and knowledge check for the first pass.</span></span></label>
      <div class="btn-row" style="margin-top:12px">${lessonNavButtons(l.id)}</div>
    </div></section>`;
  return renderShell(body,'course');
}
function practiceSection(l){
  const p=l.practice;
  let records='';
  for(let i=1;i<=p.records;i++){
    records+=`<div class="practice-card"><div class="practice-head">Practice Record ${i}</div><div class="practice-body">${p.fields.map(f=>practiceField(l.id,i,f)).join('')}<div class="save-note" data-save-note>Saved automatically on this device.</div></div></div>`;
  }
  return `<section class="card"><div class="card-header"><div class="section-kicker">Practice worksheet</div><div class="section-title">Record the practice while the lesson is fresh</div></div><div class="card-body copy"><p>${escapeHtml(p.intro)}</p>${records}</div></section>`;
}
function fieldKey(lesson,record,key){ return `${lesson}.practice.${record}.${key}`; }
function practiceField(lesson,record,f){
  const base=fieldKey(lesson,record,f.key);
  if(f.type==='textarea') return `<div class="field"><label for="${base}">${escapeHtml(f.label)}${f.optional?' (optional)':''}</label>${f.hint?`<div class="hint">${escapeHtml(f.hint)}</div>`:''}<textarea id="${base}" data-field="${base}"></textarea></div>`;
  if(f.type==='select') return `<div class="field"><label for="${base}">${escapeHtml(f.label)}</label>${f.hint?`<div class="hint">${escapeHtml(f.hint)}</div>`:''}<select id="${base}" data-field="${base}">${f.options.map(o=>`<option value="${escapeHtml(o)}">${escapeHtml(o||'Select…')}</option>`).join('')}</select></div>`;
  if(f.type==='checks') return `<div class="field"><label>${escapeHtml(f.label)}</label><div class="choice-grid two">${f.options.map(o=>`<label class="choice"><input type="checkbox" data-field-check="${base}" value="${escapeHtml(o)}"><span>${escapeHtml(o)}</span></label>`).join('')}</div></div>`;
  return '';
}
function quizSection(l){
  return `<section class="card"><div class="card-header"><div class="section-kicker">Knowledge check</div><div class="section-title">Make sure the core distinctions are clear</div></div><div class="card-body">${l.quiz.map((q,qi)=>{
    const saved=state.quizzes[`${l.id}.${qi}`];
    return `<div class="quiz-q"><div class="quiz-question">${qi+1}. ${escapeHtml(q.q)}</div><div class="choice-grid">${q.options.map((o,oi)=>`<label class="choice"><input type="radio" name="quiz-${l.id}-${qi}" data-quiz="${l.id}.${qi}" value="${oi}" ${String(saved?.selected)===String(oi)?'checked':''}><span>${escapeHtml(o)}</span></label>`).join('')}</div><div id="feedback-${l.id}-${qi}" class="quiz-feedback ${saved?'show '+(saved.correct?'correct':'incorrect'):''}">${saved?escapeHtml(q.explain):''}</div></div>`;
  }).join('')}</div></section>`;
}
function resourcesSection(l){
  if(!l.resources || !l.resources.length) return '';
  return `<section class="card"><div class="card-header"><div class="section-kicker">External learning</div><div class="section-title">Free supplemental instruction</div></div><div class="card-body">${l.resources.map(r=>`<a class="link-card" href="${r.url}" target="_blank" rel="noopener noreferrer"><strong>${escapeHtml(r.title)} ↗</strong><span>${escapeHtml(r.note)}</span></a>`).join('')}<div class="notice">External links require internet access. Course text and saved worksheets remain available offline after the app has loaded successfully.</div></div></section>`;
}
function lessonNavButtons(id){
  const idx=ALL_LESSONS.findIndex(l=>l.id===id);
  let html='';
  if(idx>0) html+=`<button type="button" class="btn" data-lesson="${ALL_LESSONS[idx-1].id}">← ${escapeHtml(ALL_LESSONS[idx-1].id)}</button>`;
  if(idx<ALL_LESSONS.length-1) html+=`<button type="button" class="btn primary" data-lesson="${ALL_LESSONS[idx+1].id}">${escapeHtml(ALL_LESSONS[idx+1].id)} →</button>`;
  else html+=`<button type="button" class="btn primary" data-route="course">Course overview</button>`;
  return html;
}

function renderPractice(){
  return renderShell(`
    <h1 class="page-title">Practice</h1>
    <p class="page-lede">Reusable attention exercises that support the course. These are brief drills, not a separate meditation program and not a substitute for the lesson worksheets.</p>
    ${timerCard('anchor',180,'3-Minute Attention Anchor','Choose the breath, feet/body contact, or sounds. Notice when attention wanders and return to the anchor. Nothing else needs to happen.')}
    ${timerCard('observe',120,'2-Minute Observe & Describe','Notice several sounds, physical sensations, or visual details. Describe them simply. If an interpretation appears, notice that it is an interpretation and return to observation.')}
    ${timerCard('one',180,'3-Minute One-Mindful Task','Choose one simple activity. Do only that task. When attention moves to planning, remembering, judging, or another task, notice the shift and return.')}
    ${timerCard('interaction',90,'90-Second Interaction Rehearsal','Imagine or recall a low-stakes conversation. Practice the question: “Am I trying to understand what this person means, or am I already preparing my answer?” Return attention to the current message.')}
    <section class="card"><div class="card-header"><div class="section-kicker">Important distinction</div><div class="section-title">No Loving Kindness audio in this app</div></div><div class="card-body copy"><p>RO-DBT Loving Kindness Meditation is intentionally not duplicated here. This app is focused on conflict-related learning, attention, rehearsal, and skill acquisition.</p></div></section>
  `,'practice');
}
function timerCard(id,seconds,title,instructions){
  return `<section class="card timer-card" data-timer-card="${id}"><div class="card-header"><div class="section-kicker">Attention drill</div><div class="section-title">${escapeHtml(title)}</div></div><div class="card-body copy"><p>${escapeHtml(instructions)}</p><div class="timer-display" id="timer-${id}">${formatTime(seconds)}</div><div class="btn-row"><button class="btn primary" type="button" data-timer-start="${id}" data-duration="${seconds}">Start</button><button class="btn" type="button" data-timer-reset="${id}" data-duration="${seconds}">Reset</button></div></div></section>`;
}
function formatTime(seconds){
  const s=Math.max(0,Math.round(seconds));
  return `${String(Math.floor(s/60)).padStart(2,'0')}:${String(s%60).padStart(2,'0')}`;
}
function stopPracticeTimer(){
  if(practiceTimer.interval) clearInterval(practiceTimer.interval);
  practiceTimer={interval:null,id:null,remaining:0,total:0,running:false};
}
function startTimer(id,total){
  if(practiceTimer.id!==id){ stopPracticeTimer(); practiceTimer={interval:null,id,remaining:total,total,running:false}; }
  if(practiceTimer.running){
    clearInterval(practiceTimer.interval); practiceTimer.interval=null; practiceTimer.running=false;
    updateTimerButton(id,'Resume'); return;
  }
  if(practiceTimer.remaining<=0) practiceTimer.remaining=total;
  practiceTimer.running=true; updateTimerButton(id,'Pause'); updateTimerDisplay(id);
  practiceTimer.interval=setInterval(()=>{
    practiceTimer.remaining-=1; updateTimerDisplay(id);
    if(practiceTimer.remaining<=0){ clearInterval(practiceTimer.interval); practiceTimer.interval=null; practiceTimer.running=false; updateTimerButton(id,'Start again'); }
  },1000);
}
function resetTimer(id,total){
  if(practiceTimer.id===id) stopPracticeTimer();
  const el=document.getElementById(`timer-${id}`); if(el) el.textContent=formatTime(total);
  updateTimerButton(id,'Start');
}
function updateTimerDisplay(id){ const el=document.getElementById(`timer-${id}`); if(el) el.textContent=formatTime(practiceTimer.remaining); }
function updateTimerButton(id,text){ const btn=document.querySelector(`[data-timer-start="${CSS.escape(id)}"]`); if(btn) btn.textContent=text; }

function renderResources(){
  return renderShell(`
    <h1 class="page-title">Resources</h1>
    <p class="page-lede">The app contains the stand-alone teaching. External resources are optional supplements. Manual references are listed inside the lessons without purchase links.</p>
    <section class="card"><div class="card-header"><div class="section-kicker">Jennifer May, PhD</div><div class="section-title">Mindfulness and conflict-relevant skills</div></div><div class="card-body">
      <a class="link-card" href="https://www.youtube.com/watch?v=AjKi81uqHK0" target="_blank" rel="noopener noreferrer"><strong>DBT Mindfulness Intro ↗</strong><span>Introduction to mindfulness and its uses.</span></a>
      <a class="link-card" href="https://www.youtube.com/watch?v=TlrIi3V50Qs" target="_blank" rel="noopener noreferrer"><strong>DBT Mindfulness What Skills ↗</strong><span>Observe, Describe, and Participate.</span></a>
      <a class="link-card" href="https://www.youtube.com/watch?v=1vWsgg9JiDo" target="_blank" rel="noopener noreferrer"><strong>DBT Mindfulness How Skills ↗</strong><span>Nonjudgmentally, One-Mindfully, and Effectively.</span></a>
      <a class="link-card" href="https://www.youtube.com/watch?v=fkEJXu-SxLw" target="_blank" rel="noopener noreferrer"><strong>RO-DBT Lesson 2 — Understanding Emotions ↗</strong><span>Cue and emotional-response-system instruction.</span></a>
      <a class="link-card" href="https://www.youtube.com/watch?v=Od9GaNk9Clk" target="_blank" rel="noopener noreferrer"><strong>DBT STOP Skill ↗</strong><span>Behavioral interruption skill.</span></a>
      <a class="link-card" href="https://www.youtube.com/watch?v=sd0OK8K0HDg" target="_blank" rel="noopener noreferrer"><strong>DBT TIPP Skills ↗</strong><span>Body-based distress-tolerance instruction.</span></a>
      <a class="link-card" href="https://www.youtube.com/@jennifermayph.d.2761" target="_blank" rel="noopener noreferrer"><strong>Jennifer May YouTube channel ↗</strong><span>Broader RO-DBT and standard DBT clinician-created teaching.</span></a>
    </div></section>
    <section class="card"><div class="card-header"><div class="section-kicker">Free reference indexes</div><div class="section-title">Supporting material</div></div><div class="card-body">
      <a class="link-card" href="https://jamesfitzgeraldtherapy.com/dbt-mindfulness-skills-training/" target="_blank" rel="noopener noreferrer"><strong>DBT Mindfulness Skills Training index ↗</strong><span>Indexes standard DBT mindfulness topics and Jennifer May videos.</span></a>
      <a class="link-card" href="https://jamesfitzgeraldtherapy.com/dbt-distress-tolerance-skills-training/" target="_blank" rel="noopener noreferrer"><strong>DBT Distress Tolerance index ↗</strong><span>Indexes STOP, TIPP, and related skills resources.</span></a>
      <a class="link-card" href="https://www.guilford.com/dbt-manual" target="_blank" rel="noopener noreferrer"><strong>Guilford DBT supplementary materials ↗</strong><span>Official standard DBT resource page.</span></a>
    </div></section>
    <section class="card"><div class="card-header"><div class="section-kicker">Optional broader supplement</div><div class="section-title">PACT</div></div><div class="card-body"><a class="link-card" href="https://www.thepactinstitute.com/intro-to-pact-webinar" target="_blank" rel="noopener noreferrer"><strong>PACT Institute — free Intro to PACT webinar ↗</strong><span>Optional material on arousal regulation, attachment, and secure functioning. Not required for the mindfulness foundation or Module 1.</span></a></div></section>
  `,'resources');
}

function renderSettings(){
  return renderShell(`
    <h1 class="page-title">Settings</h1>
    <section class="card"><div class="card-header"><div class="section-kicker">Privacy</div><div class="section-title">4-digit app passcode</div></div><div class="card-body copy">
      <p>The passcode prevents casual access to the training app and locally stored worksheet notes. The app locks after ${Math.round(AUTO_LOCK_MS/60000)} minutes of inactivity or background time.</p>
      <div class="notice">A four-digit passcode is a convenience/privacy lock, not strong encryption. Local data is not yet backed up.</div>
      <div class="btn-row"><button class="btn primary" type="button" data-action="lock-now">Lock now</button><button class="btn" type="button" data-action="change-pin">Change passcode</button></div>
    </div></section>
    <section class="card"><div class="card-header"><div class="section-kicker">Local data</div><div class="section-title">Training records on this device</div></div><div class="card-body copy">
      <p>Lesson completion, practice worksheets, and knowledge-check selections are stored locally in this browser using IndexedDB. Updating the files in the same GitHub Pages site does not intentionally clear that database.</p>
      <div class="btn-row"><button type="button" class="btn" data-action="reset-course">Reset course progress & notes</button><button type="button" class="btn danger-btn" data-action="erase-all">Erase app data & passcode</button></div>
    </div></section>
    <section class="card"><div class="card-header"><div class="section-kicker">Version ${VERSION}</div><div class="section-title">Current build</div></div><div class="card-body copy">
      <ul><li>Added Mindfulness & Attention Foundation F1-F4.</li><li>Added a reusable Practice area without Loving Kindness audio.</li><li>Added 4-digit passcode setup, unlock, change-code flow, privacy cover, and auto-lock.</li><li>Removed paid prerecorded RO-DBT class links and RO-DBT manual purchase links.</li><li>Preserved the Module 1 worksheet keys and database name so existing v0.1.0 notes can carry forward on the same site.</li></ul>
    </div></section>
  `,'settings');
}

function render(){
  if(!unlocked){ renderPinScreen(); return; }
  const app=document.getElementById('app');
  if(state.route==='lesson') app.innerHTML=renderLesson(state.currentLesson);
  else if(state.route==='practice') app.innerHTML=renderPractice();
  else if(state.route==='resources') app.innerHTML=renderResources();
  else if(state.route==='settings') app.innerHTML=renderSettings();
  else app.innerHTML=renderCourse();
  bind(); restoreFields(); markActivity();
  requestAnimationFrame(()=>{ const main=document.getElementById('main-content'); if(main) main.scrollTop=0; });
}
function bind(){
  document.querySelectorAll('[data-route]').forEach(el=>el.addEventListener('click',()=>{ stopPracticeTimer(); state.route=el.dataset.route; persist(); render(); }));
  document.querySelectorAll('[data-lesson]').forEach(el=>el.addEventListener('click',()=>{ stopPracticeTimer(); state.currentLesson=el.dataset.lesson; state.route='lesson'; persist(); render(); }));
  document.querySelectorAll('[data-field]').forEach(el=>{
    el.addEventListener('input',()=>{ state.fields[el.dataset.field]=el.value; persist(); showSaved(el); markActivity(); });
    el.addEventListener('change',()=>{ state.fields[el.dataset.field]=el.value; persist(); showSaved(el); markActivity(); });
  });
  document.querySelectorAll('[data-field-check]').forEach(el=>el.addEventListener('change',()=>{
    const key=el.dataset.fieldCheck;
    const vals=Array.from(document.querySelectorAll(`[data-field-check="${CSS.escape(key)}"]`)).filter(x=>x.checked).map(x=>x.value);
    state.fields[key]=vals; persist(); showSaved(el); markActivity();
  }));
  document.querySelectorAll('[data-quiz]').forEach(el=>el.addEventListener('change',()=>handleQuiz(el)));
  document.querySelectorAll('[data-complete]').forEach(el=>el.addEventListener('change',()=>{
    state.completed[el.dataset.complete]=el.checked; persist();
    const pill=document.querySelector('.status-pill'); if(pill) pill.textContent=`${completedCount()}/${ALL_LESSONS.length} complete`;
  }));
  document.querySelectorAll('[data-timer-start]').forEach(el=>el.addEventListener('click',()=>startTimer(el.dataset.timerStart,Number(el.dataset.duration))));
  document.querySelectorAll('[data-timer-reset]').forEach(el=>el.addEventListener('click',()=>resetTimer(el.dataset.timerReset,Number(el.dataset.duration))));
  document.querySelector('[data-action="lock-now"]')?.addEventListener('click',()=>lockNow());
  document.querySelector('[data-action="change-pin"]')?.addEventListener('click',()=>startChangePin());
  document.querySelector('[data-action="reset-course"]')?.addEventListener('click',resetCourseData);
  document.querySelector('[data-action="erase-all"]')?.addEventListener('click',eraseAllData);
}
function restoreFields(){
  document.querySelectorAll('[data-field]').forEach(el=>{ const v=state.fields[el.dataset.field]; if(v!==undefined) el.value=v; });
  document.querySelectorAll('[data-field-check]').forEach(el=>{ const vals=state.fields[el.dataset.fieldCheck] || []; el.checked=Array.isArray(vals) && vals.includes(el.value); });
}
function showSaved(el){
  const card=el.closest('.practice-body'); if(!card) return;
  const note=card.querySelector('[data-save-note]'); if(!note) return;
  note.textContent='Saved.'; clearTimeout(note._t); note._t=setTimeout(()=>note.textContent='Saved automatically on this device.',900);
}
function handleQuiz(el){
  const [lessonId,qiStr]=el.dataset.quiz.split('.'); const qi=Number(qiStr); const l=lessonById(lessonId); const q=l.quiz[qi];
  const selected=Number(el.value); const correct=selected===q.correct;
  state.quizzes[el.dataset.quiz]={selected,correct}; persist();
  const fb=document.getElementById(`feedback-${lessonId}-${qi}`); if(fb){ fb.className=`quiz-feedback show ${correct?'correct':'incorrect'}`; fb.textContent=q.explain; }
}
async function resetCourseData(){
  if(!confirm('Reset all lesson completion, worksheet notes, and knowledge-check answers? The passcode will be kept.')) return;
  state.completed={}; state.fields={}; state.quizzes={}; state.route='course'; state.currentLesson='F1'; await immediateSave(); render();
}
async function eraseAllData(){
  if(!confirm('Erase ALL local training data, including worksheet notes and the passcode?')) return;
  if(!confirm('This cannot be undone because this version has no backup. Erase everything?')) return;
  await deleteDatabaseAndRestart();
}

// ---- 4-digit passcode ------------------------------------------------------
function bytesToB64(bytes){ let s=''; bytes.forEach(b=>s+=String.fromCharCode(b)); return btoa(s); }
function b64ToBytes(s){ const raw=atob(s); return Uint8Array.from(raw,c=>c.charCodeAt(0)); }
async function derivePin(pin,saltB64){
  if(!crypto?.subtle) throw new Error('Secure passcode functions are not available in this browser.');
  const enc=new TextEncoder();
  const key=await crypto.subtle.importKey('raw',enc.encode(pin),'PBKDF2',false,['deriveBits']);
  const bits=await crypto.subtle.deriveBits({name:'PBKDF2',hash:'SHA-256',salt:b64ToBytes(saltB64),iterations:60000},key,256);
  return bytesToB64(new Uint8Array(bits));
}
async function saveNewPin(pin){
  const salt=new Uint8Array(16); crypto.getRandomValues(salt);
  const saltB64=bytesToB64(salt); const hash=await derivePin(pin,saltB64);
  state.security={pinSet:true,pinSalt:saltB64,pinHash:hash}; await immediateSave();
}
async function verifyPin(pin){
  if(!state.security.pinSet) return false;
  const hash=await derivePin(pin,state.security.pinSalt); return hash===state.security.pinHash;
}
function pinTitle(){
  if(pinMode==='setup-first') return ['Create a passcode','Choose a 4-digit code to protect local training notes.'];
  if(pinMode==='setup-confirm') return ['Confirm passcode','Enter the same 4 digits again.'];
  if(pinMode==='change-verify') return ['Change passcode','Enter the current 4-digit code first.'];
  if(pinMode==='change-first') return ['Choose new passcode','Enter a new 4-digit code.'];
  if(pinMode==='change-confirm') return ['Confirm new passcode','Enter the new code again.'];
  return ['Enter passcode','Unlock Personal Conflict Training.'];
}
function renderPinScreen(){
  const app=document.getElementById('app');
  const [title,sub]=pinTitle();
  const dots=[0,1,2,3].map(i=>`<span class="pin-dot ${i<pinBuffer.length?'filled':''}"></span>`).join('');
  app.innerHTML=`<div class="lock-shell"><div class="lock-card"><div class="lock-brand">Personal Conflict Training</div><div class="lock-version">v${VERSION}</div><h1>${escapeHtml(title)}</h1><p>${escapeHtml(sub)}</p><div class="pin-dots" aria-label="${pinBuffer.length} of 4 digits entered">${dots}</div><div class="pin-message ${pinMessage?'show':''}" aria-live="polite">${escapeHtml(pinMessage||' ')}</div><div class="pin-keypad">${[1,2,3,4,5,6,7,8,9].map(n=>`<button type="button" data-pin-digit="${n}">${n}</button>`).join('')}<button type="button" data-pin-clear aria-label="Clear passcode">⌫</button><button type="button" data-pin-digit="0">0</button><button type="button" data-pin-empty disabled aria-hidden="true"></button></div>${pinMode==='unlock'?'<button class="forgot-btn" type="button" data-forgot-pin>Forgot passcode?</button>':''}</div></div>`;
  bindPinScreen();
}
function bindPinScreen(){
  document.querySelectorAll('[data-pin-digit]').forEach(b=>b.addEventListener('click',()=>addPinDigit(b.dataset.pinDigit)));
  document.querySelector('[data-pin-clear]')?.addEventListener('click',()=>{ pinBuffer=pinBuffer.slice(0,-1); pinMessage=''; renderPinScreen(); });
  document.querySelector('[data-forgot-pin]')?.addEventListener('click',async()=>{
    if(!confirm('There is no passcode recovery in this version. Erasing the app data will remove the passcode and all locally saved training notes. Continue?')) return;
    if(!confirm('Erase all local app data and start over?')) return;
    await deleteDatabaseAndRestart();
  });
}
async function addPinDigit(d){
  if(pinBuffer.length>=4) return;
  pinBuffer+=String(d); pinMessage=''; renderPinScreen();
  if(pinBuffer.length===4) setTimeout(processPin,80);
}
async function processPin(){
  const entered=pinBuffer;
  try{
    if(pinMode==='setup-first' || pinMode==='change-first'){
      firstPin=entered; pinBuffer=''; pinMode=pinMode==='setup-first'?'setup-confirm':'change-confirm'; pinMessage=''; renderPinScreen(); return;
    }
    if(pinMode==='setup-confirm' || pinMode==='change-confirm'){
      if(entered!==firstPin){ firstPin=''; pinBuffer=''; pinMode=pinMode==='setup-confirm'?'setup-first':'change-first'; pinMessage='Codes did not match. Try again.'; renderPinScreen(); return; }
      await saveNewPin(entered); pinBuffer=''; firstPin=''; pinMessage=''; unlocked=true; state.route='course'; render(); return;
    }
    if(pinMode==='change-verify'){
      if(await verifyPin(entered)){ pinBuffer=''; firstPin=''; pinMode='change-first'; pinMessage=''; renderPinScreen(); }
      else { pinBuffer=''; pinMessage='Incorrect passcode.'; renderPinScreen(); }
      return;
    }
    if(await verifyPin(entered)){ pinBuffer=''; pinMessage=''; unlocked=true; render(); }
    else { pinBuffer=''; pinMessage='Incorrect passcode.'; renderPinScreen(); }
  }catch(e){ pinBuffer=''; pinMessage='Unable to verify the passcode in this browser.'; renderPinScreen(); }
}
function startChangePin(){ stopPracticeTimer(); unlocked=false; pinMode='change-verify'; pinBuffer=''; firstPin=''; pinMessage=''; clearTimeout(inactivityTimer); renderPinScreen(); }
function lockNow(){
  if(!state.security.pinSet) return;
  stopPracticeTimer(); unlocked=false; pinMode='unlock'; pinBuffer=''; firstPin=''; pinMessage=''; clearTimeout(inactivityTimer); document.body.classList.remove('privacy-covered'); renderPinScreen();
}
async function deleteDatabaseAndRestart(){
  stopPracticeTimer(); clearTimeout(inactivityTimer);
  try{ db?.close(); }catch(_){ }
  await new Promise(resolve=>{ const req=indexedDB.deleteDatabase(DB_NAME); req.onsuccess=resolve; req.onerror=resolve; req.onblocked=resolve; });
  location.reload();
}
function markActivity(){
  if(!unlocked || !state.security.pinSet) return;
  clearTimeout(inactivityTimer); inactivityTimer=setTimeout(lockNow,AUTO_LOCK_MS);
}
function setupSecurityListeners(){
  ['pointerdown','keydown','input','touchstart'].forEach(evt=>document.addEventListener(evt,markActivity,{passive:true}));
  document.addEventListener('scroll',markActivity,true);
  document.addEventListener('visibilitychange',()=>{
    if(document.hidden){ hiddenAt=Date.now(); document.body.classList.add('privacy-covered'); }
    else {
      document.body.classList.remove('privacy-covered');
      if(unlocked && state.security.pinSet && hiddenAt && Date.now()-hiddenAt>=AUTO_LOCK_MS) lockNow();
      else markActivity();
      hiddenAt=null;
    }
  });
  window.addEventListener('pagehide',()=>{ document.body.classList.add('privacy-covered'); });
  window.addEventListener('pageshow',()=>{ document.body.classList.remove('privacy-covered'); });
  document.addEventListener('keydown',e=>{
    if(unlocked) return;
    if(/^\d$/.test(e.key)){ e.preventDefault(); addPinDigit(e.key); }
    else if(e.key==='Backspace'){ e.preventDefault(); pinBuffer=pinBuffer.slice(0,-1); pinMessage=''; renderPinScreen(); }
  });
}

async function init(){
  if(!window.indexedDB){ document.getElementById('app').innerHTML='<div style="padding:24px;font-family:-apple-system,BlinkMacSystemFont,Segoe UI,sans-serif"><h2>Browser not supported</h2><p>This training app requires local browser storage.</p></div>'; return; }
  try{ db=await openDb(); state=normalizeState(await loadState()); }catch(_){ state=structuredClone(DEFAULT_STATE); }
  setupSecurityListeners();
  if(state.security.pinSet){ unlocked=false; pinMode='unlock'; }
  else { unlocked=false; pinMode='setup-first'; }
  renderPinScreen();
  if('serviceWorker' in navigator && location.protocol!=='file:') navigator.serviceWorker.register('./sw.js?v=0.2.0').then(r=>r.update()).catch(()=>{});
}
init();
