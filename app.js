const VERSION = '0.1.0';
const DB_NAME = 'ConflictTrainingDB';
const DB_VERSION = 1;
const STORE = 'state';
const STATE_KEY = 'app-state';

const DEFAULT_STATE = {
  route: 'home',
  currentLesson: '1.1',
  completed: {},
  fields: {},
  quizzes: {},
  updatedAt: null
};

const LESSONS = [
  {
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
      {title:'Jennifer May, PhD — RO-DBT Lesson 2: Understanding Emotions', url:'https://www.youtube.com/watch?v=fkEJXu-SxLw', note:'Free clinician-created explanation of the five categories of emotionally relevant cues.'},
      {title:'Official RO-DBT Skills Class — Lesson 2', url:'https://rodbtskillsclasses.vhx.tv/products/lesson-2-understanding-emotions', note:'Optional paid pre-recorded RO-DBT skills class.'},
      {title:'RO-DBT Skills Training Manual — publisher page', url:'https://www.newharbinger.com/9781626259317/the-skills-training-manual-for-radically-open-dialectical-behavior-therapy/', note:'Primary written source for Handouts 2.1-2.2 and Worksheet 2.A.'}
    ],
    refs:'RO-DBT Skills Training Manual: Handout 2.1, Handout 2.2, Worksheet 2.A. Course language is paraphrased and expanded for instruction.'
  },
  {
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
      {title:'Official RO-DBT Skills Classes — full lesson catalog',url:'https://rodbtskillsclasses.vhx.tv/products',note:'Lesson 11 is Mindfulness Training Part 1 and includes Fixed Mind material.'},
      {title:'RO-DBT Skills Training Manual — publisher page',url:'https://www.newharbinger.com/9781626259317/the-skills-training-manual-for-radically-open-dialectical-behavior-therapy/',note:'Primary written source for Handouts 11.1-11.4 and Worksheet 11.A.'}
    ],
    refs:'RO-DBT Skills Training Manual: Handouts 11.1-11.4 and Worksheet 11.A. Introduced here because the material directly supports conflict-cue detection.'
  },
  {
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
      {title:'Official RO-DBT Skills Class — Lesson 3: Activating Social Safety',url:'https://rodbtskillsclasses.vhx.tv/products/lesson-3-activating-social-safety',note:'Optional paid RO-DBT lesson on the social-safety system and Big Three + 1.'},
      {title:'Jennifer May, PhD — TIPP Skills video',url:'https://www.youtube.com/watch?v=sd0OK8K0HDg',note:'Clinician-created standard DBT instruction covering TIP/TIPP skills.'},
      {title:'DBT Distress Tolerance resource index',url:'https://jamesfitzgeraldtherapy.com/dbt-distress-tolerance-skills-training/',note:'Includes STOP, TIPP, and paired muscle relaxation resources.'},
      {title:'Official Guilford DBT supplementary materials',url:'https://www.guilford.com/dbt-manual',note:'Official DBT handout/worksheet resource information.'}
    ],
    refs:'RO-DBT Skills Training Manual: Handout 3.1 and later Handout 17.1. Standard DBT: Distress Tolerance Handouts 6 and 6b. “Release → Exhale → Soften → Slow” is a custom course integration.'
  },
  {
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
function escapeHtml(s=''){ return String(s).replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c])); }
function lessonById(id){ return LESSONS.find(l=>l.id===id) || LESSONS[0]; }
function completedCount(){ return LESSONS.filter(l=>state.completed[l.id]).length; }
function progressPercent(){ return Math.round((completedCount()/LESSONS.length)*100); }
function renderShell(content,active='home'){
  const count=completedCount();
  return `<div class="app-shell">
    <header class="topbar"><div class="topbar-row"><div class="brand-wrap"><div class="brand">Personal Conflict Training</div><div class="brand-sub">Module 1 · Catch & Brake · v${VERSION}</div></div><div class="status-pill">${count}/${LESSONS.length} complete</div></div></header>
    <main class="content" id="main-content">${content}</main>
    <nav class="bottom-nav" aria-label="Primary"><div class="bottom-nav-inner">
      ${navBtn('home','⌂','Home',active)}${navBtn('module','≡','Module 1',active)}${navBtn('resources','↗','Resources',active)}${navBtn('about','i','About',active)}
    </div></nav>
  </div>`;
}
function navBtn(route,icon,label,active){ return `<button class="nav-btn ${active===route?'active':''}" data-route="${route}" type="button"><span class="nav-icon">${icon}</span>${label}</button>`; }
function renderHome(){
  const next=LESSONS.find(l=>!state.completed[l.id]) || LESSONS[0];
  const pct=progressPercent();
  return renderShell(`
    <h1 class="page-title">Core Personal Training</h1>
    <p class="page-lede">A stand-alone, source-grounded skills course for improving conflict awareness and response flexibility. The course assumes no prior knowledge of RO-DBT, standard DBT, or couples-therapy concepts.</p>
    <section class="card"><div class="card-header"><div class="section-kicker">Module 1</div><div class="section-title">Catch & Brake</div></div><div class="card-body copy">
      <p>Build the first capability needed in difficult interactions: notice that the process has changed, interrupt automatic escalation, and downshift enough to regain behavioral choice.</p>
      <div class="progress-wrap"><div class="progress-track"><div class="progress-bar" style="width:${pct}%"></div></div><div class="progress-meta"><span>${completedCount()} of ${LESSONS.length} lessons complete</span><span>${pct}%</span></div></div>
      <div class="btn-row" style="margin-top:12px"><button class="btn primary" data-lesson="${next.id}" type="button">${completedCount()?`Continue ${next.id}`:'Start Module 1'}</button><button class="btn soft" data-route="module" type="button">View lessons</button></div>
    </div></section>
    <section class="card"><div class="card-header"><div class="section-kicker">Course design</div><div class="section-title">How this training works</div></div><div class="card-body copy">
      <ul><li>Each lesson teaches concepts in plain language before asking the learner to use them.</li><li>Practice worksheets are built into the lesson and save locally on this device.</li><li>Manual terminology is defined before it is used.</li><li>Examples include general everyday situations as well as conflict examples.</li><li>Source-based content is distinguished from custom integrated exercises.</li></ul>
      <div class="notice">This is educational skills training and does not replace treatment. It does not diagnose the learner or another person.</div>
    </div></section>
    <section class="card"><div class="card-header"><div class="section-kicker">Module 1 lessons</div></div><div class="card-body"><div class="lesson-list">${lessonRows()}</div></div></section>
  `,'home');
}
function lessonRows(){ return LESSONS.map(l=>`<button class="lesson-row ${state.completed[l.id]?'complete':''}" data-lesson="${l.id}" type="button"><div><div class="lesson-row-title">${l.id} — ${escapeHtml(l.title)}</div><div class="lesson-row-sub">${escapeHtml(l.subtitle)}</div></div><div class="checkmark">✓</div></button>`).join(''); }
function renderModule(){
  const pct=progressPercent();
  return renderShell(`
    <h1 class="page-title">Module 1 — Catch & Brake</h1><p class="page-lede">Five lessons build from general detection to a brief integrated micro-pause. Work in order on the first pass; later review can be selective.</p>
    <section class="card"><div class="card-body"><div class="progress-wrap"><div class="progress-track"><div class="progress-bar" style="width:${pct}%"></div></div><div class="progress-meta"><span>${completedCount()} of ${LESSONS.length} complete</span><span>${pct}%</span></div></div></div></section>
    <section class="card"><div class="card-header"><div class="section-kicker">Lessons</div></div><div class="card-body"><div class="lesson-list">${lessonRows()}</div></div></section>
    <section class="card"><div class="card-header"><div class="section-kicker">Module outcome</div></div><div class="card-body copy"><p>By the end of Module 1, the learner should be able to notice activation at an early or late point, recognize a defensive shift, use STOP, perform a brief physiological/social downshift, and combine those pieces into a micro-pause.</p><p>Completion means the material has been learned and practiced. It does not imply mastery during the most difficult real-world conflicts.</p></div></section>
  `,'module');
}
function renderLesson(id){
  const l=lessonById(id); state.currentLesson=l.id; state.route='lesson'; persist();
  const body=`
    <button type="button" class="back-btn" data-route="module">← Back to Module 1</button>
    <div class="breadcrumb"><span>Module 1</span><span>›</span><span>Lesson ${l.id}</span></div>
    <h1 class="page-title">${l.id} — ${escapeHtml(l.title)}</h1>
    <p class="page-lede">${escapeHtml(l.subtitle)}</p>
    <div class="badges">${l.badges.map(b=>`<span class="badge ${b.startsWith('RO-')?'ro':b.startsWith('Standard')?'dbt':b.startsWith('Custom')||b.includes('Integrated')?'custom':''}">${escapeHtml(b)}</span>`).join('')}</div>
    ${l.body}
    ${practiceSection(l)}
    ${quizSection(l)}
    ${resourcesSection(l)}
    <section class="card"><div class="card-header"><div class="section-kicker">Source map</div><div class="section-title">Where this lesson comes from</div></div><div class="card-body copy"><p>${escapeHtml(l.refs)}</p></div></section>
    <section class="card"><div class="card-header"><div class="section-kicker">Completion</div></div><div class="card-body">
      <label class="complete-box"><input type="checkbox" data-complete="${l.id}" ${state.completed[l.id]?'checked':''}><span><strong>Mark Lesson ${l.id} complete</strong><br><span class="subtle">Use this after reviewing the lesson and completing the practice you intend to do for the first pass.</span></span></label>
      <div class="btn-row" style="margin-top:12px">${lessonNavButtons(l.id)}</div>
    </div></section>`;
  return renderShell(body,'module');
}
function practiceSection(l){
  const p=l.practice;
  let records='';
  for(let i=1;i<=p.records;i++){
    records+=`<div class="practice-card"><div class="practice-head">Practice Record ${i}</div><div class="practice-body">${p.fields.map(f=>practiceField(l.id,i,f)).join('')}<div class="save-note" data-save-note>Saved automatically on this device.</div></div></div>`;
  }
  return `<section class="card"><div class="card-header"><div class="section-kicker">Practice worksheet</div><div class="section-title">Record the experience while the lesson is fresh</div></div><div class="card-body copy"><p>${escapeHtml(p.intro)}</p>${records}</div></section>`;
}
function fieldKey(lesson,record,key){ return `${lesson}.practice.${record}.${key}`; }
function practiceField(lesson,record,f){
  const base=fieldKey(lesson,record,f.key);
  if(f.type==='textarea') return `<div class="field"><label for="${base}">${escapeHtml(f.label)}${f.optional?' (optional)':''}</label>${f.hint?`<div class="hint">${escapeHtml(f.hint)}</div>`:''}<textarea id="${base}" data-field="${base}"></textarea></div>`;
  if(f.type==='select') return `<div class="field"><label for="${base}">${escapeHtml(f.label)}</label>${f.hint?`<div class="hint">${escapeHtml(f.hint)}</div>`:''}<select id="${base}" data-field="${base}">${f.options.map(o=>`<option value="${escapeHtml(o)}">${escapeHtml(o||'Select…')}</option>`).join('')}</select></div>`;
  if(f.type==='checks') return `<div class="field"><label>${escapeHtml(f.label)}</label><div class="choice-grid two">${f.options.map((o,j)=>`<label class="choice"><input type="checkbox" data-field-check="${base}" value="${escapeHtml(o)}"><span>${escapeHtml(o)}</span></label>`).join('')}</div></div>`;
  return '';
}
function quizSection(l){
  return `<section class="card"><div class="card-header"><div class="section-kicker">Knowledge check</div><div class="section-title">Make sure the core distinctions are clear</div></div><div class="card-body">${l.quiz.map((q,qi)=>{
    const saved=state.quizzes[`${l.id}.${qi}`];
    return `<div class="quiz-q"><div class="quiz-question">${qi+1}. ${escapeHtml(q.q)}</div><div class="choice-grid">${q.options.map((o,oi)=>`<label class="choice"><input type="radio" name="quiz-${l.id}-${qi}" data-quiz="${l.id}.${qi}" value="${oi}" ${String(saved?.selected)===String(oi)?'checked':''}><span>${escapeHtml(o)}</span></label>`).join('')}</div><div id="feedback-${l.id}-${qi}" class="quiz-feedback ${saved?'show '+(saved.correct?'correct':'incorrect'):''}">${saved?escapeHtml(q.explain):''}</div></div>`;
  }).join('')}</div></section>`;
}
function resourcesSection(l){
  return `<section class="card"><div class="card-header"><div class="section-kicker">External learning</div><div class="section-title">Optional and primary-source resources</div></div><div class="card-body">${l.resources.map(r=>`<a class="link-card" href="${r.url}" target="_blank" rel="noopener noreferrer"><strong>${escapeHtml(r.title)} ↗</strong><span>${escapeHtml(r.note)}</span></a>`).join('')}<div class="notice">External links require an internet connection. The course text and saved worksheets remain available offline after the app has been loaded successfully.</div></div></section>`;
}
function lessonNavButtons(id){
  const idx=LESSONS.findIndex(l=>l.id===id); let html='';
  if(idx>0) html+=`<button type="button" class="btn" data-lesson="${LESSONS[idx-1].id}">← ${LESSONS[idx-1].id}</button>`;
  if(idx<LESSONS.length-1) html+=`<button type="button" class="btn primary" data-lesson="${LESSONS[idx+1].id}">${LESSONS[idx+1].id} →</button>`;
  else html+=`<button type="button" class="btn primary" data-route="module">Module overview</button>`;
  return html;
}
function renderResources(){
  return renderShell(`
    <h1 class="page-title">Resources</h1><p class="page-lede">Primary manuals remain the main technical sources. Videos and outside materials are used to deepen understanding, not to replace the source texts.</p>
    <section class="card"><div class="card-header"><div class="section-kicker">RO-DBT</div><div class="section-title">Primary and clinician instruction</div></div><div class="card-body">
      <a class="link-card" href="https://www.newharbinger.com/9781626259317/the-skills-training-manual-for-radically-open-dialectical-behavior-therapy/" target="_blank" rel="noopener noreferrer"><strong>RO-DBT Skills Training Manual ↗</strong><span>Thomas R. Lynch. Primary source for RO-DBT lesson structure, handouts, worksheets, and skills.</span></a>
      <a class="link-card" href="https://www.youtube.com/@jennifermayph.d.2761" target="_blank" rel="noopener noreferrer"><strong>Jennifer May, PhD — YouTube channel ↗</strong><span>Clinician-created videos covering RO-DBT, standard DBT, and related skills.</span></a>
      <a class="link-card" href="https://rodbtskillsclasses.vhx.tv/products" target="_blank" rel="noopener noreferrer"><strong>Official pre-recorded RO-DBT Skills Classes ↗</strong><span>Paid lesson-by-lesson RO-DBT skills classes.</span></a>
    </div></section>
    <section class="card"><div class="card-header"><div class="section-kicker">Standard DBT</div><div class="section-title">Primary and clinician instruction</div></div><div class="card-body">
      <a class="link-card" href="https://www.guilford.com/dbt-manual" target="_blank" rel="noopener noreferrer"><strong>Guilford DBT supplementary materials ↗</strong><span>Official resource page for Linehan DBT skills materials.</span></a>
      <a class="link-card" href="https://jamesfitzgeraldtherapy.com/dbt-distress-tolerance-skills-training/" target="_blank" rel="noopener noreferrer"><strong>DBT Distress Tolerance resource index ↗</strong><span>Indexes Jennifer May videos for STOP, TIPP, and other distress-tolerance material.</span></a>
    </div></section>
    <section class="card"><div class="card-header"><div class="section-kicker">Supplemental</div><div class="section-title">Relationship and arousal material</div></div><div class="card-body">
      <a class="link-card" href="https://www.thepactinstitute.com/intro-to-pact-webinar" target="_blank" rel="noopener noreferrer"><strong>PACT Institute — free Intro to PACT webinar ↗</strong><span>Optional supplement on arousal regulation, attachment, and secure functioning.</span></a>
    </div></section>
  `,'resources');
}
function renderAbout(){
  return renderShell(`
    <h1 class="page-title">About this training</h1>
    <section class="card"><div class="card-header"><div class="section-kicker">Version 0.1.0</div><div class="section-title">First web-based training prototype</div></div><div class="card-body copy">
      <p>This first iteration contains Module 1 only. It is designed as a phone-first progressive web app and uses a visual layout similar to the companion RO-DBT diary app.</p>
      <ul class="about-list"><li>iPhone-friendly touch targets and safe-area spacing.</li><li>Can be installed to the Home Screen when served over HTTPS.</li><li>Lesson completion, practice notes, and quiz selections save locally in this browser using IndexedDB.</li><li>Local course content is cached for offline access after first load.</li><li>External videos and websites still require internet access.</li></ul>
      <div class="notice">Local browser storage is not the same as a backup. A later version can add export/import once the training structure is settled.</div>
    </div></section>
    <section class="card"><div class="card-header"><div class="section-kicker">Course principles</div></div><div class="card-body copy"><ul><li>Universal framing: the course does not assume a particular relationship, diagnosis, or conflict pattern.</li><li>No hidden prerequisites: terms are defined before they are used.</li><li>Examples remain broad and include source-manual examples as well as interpersonal situations.</li><li>Custom integrations are labeled rather than presented as official skills.</li><li>Training supports but does not replace professional treatment.</li></ul></div></section>
    <section class="card"><div class="card-header"><div class="section-kicker">Local data</div></div><div class="card-body copy"><p>Resetting removes lesson completion, worksheet notes, and quiz selections stored by this training app on this browser.</p><button type="button" class="btn" data-action="reset-data">Reset training data</button></div></section>
  `,'about');
}
function render(){
  const app=document.getElementById('app');
  if(state.route==='lesson') app.innerHTML=renderLesson(state.currentLesson);
  else if(state.route==='module') app.innerHTML=renderModule();
  else if(state.route==='resources') app.innerHTML=renderResources();
  else if(state.route==='about') app.innerHTML=renderAbout();
  else app.innerHTML=renderHome();
  bind(); restoreFields();
  requestAnimationFrame(()=>{ const main=document.getElementById('main-content'); if(main) main.scrollTop=0; });
}
function bind(){
  document.querySelectorAll('[data-route]').forEach(el=>el.addEventListener('click',()=>{ state.route=el.dataset.route; persist(); render(); }));
  document.querySelectorAll('[data-lesson]').forEach(el=>el.addEventListener('click',()=>{ state.currentLesson=el.dataset.lesson; state.route='lesson'; persist(); render(); }));
  document.querySelectorAll('[data-field]').forEach(el=>{
    el.addEventListener('input',()=>{ state.fields[el.dataset.field]=el.value; persist(); showSaved(el); });
    el.addEventListener('change',()=>{ state.fields[el.dataset.field]=el.value; persist(); showSaved(el); });
  });
  document.querySelectorAll('[data-field-check]').forEach(el=>el.addEventListener('change',()=>{
    const key=el.dataset.fieldCheck;
    const vals=Array.from(document.querySelectorAll(`[data-field-check="${CSS.escape(key)}"]`)).filter(x=>x.checked).map(x=>x.value);
    state.fields[key]=vals; persist(); showSaved(el);
  }));
  document.querySelectorAll('[data-quiz]').forEach(el=>el.addEventListener('change',()=>handleQuiz(el)));
  document.querySelectorAll('[data-complete]').forEach(el=>el.addEventListener('change',()=>{
    state.completed[el.dataset.complete]=el.checked; persist();
    const pill=document.querySelector('.status-pill'); if(pill) pill.textContent=`${completedCount()}/${LESSONS.length} complete`;
  }));
  const reset=document.querySelector('[data-action="reset-data"]');
  if(reset) reset.addEventListener('click',async()=>{
    if(!confirm('Reset all Module 1 training data stored in this browser?')) return;
    state=structuredClone(DEFAULT_STATE); await immediateSave(); render();
  });
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
function immediateSave(){
  state.updatedAt=new Date().toISOString();
  return new Promise(resolve=>{ try{ const tx=db.transaction(STORE,'readwrite'); tx.objectStore(STORE).put(state,STATE_KEY); tx.oncomplete=resolve; tx.onerror=resolve; }catch(_){ resolve(); } });
}
async function init(){
  if(!window.indexedDB){ document.getElementById('app').innerHTML='<div style="padding:24px;font-family:-apple-system,BlinkMacSystemFont,Segoe UI,sans-serif"><h2>Browser not supported</h2><p>This training app requires local browser storage.</p></div>'; return; }
  try{ db=await openDb(); state=Object.assign(structuredClone(DEFAULT_STATE),await loadState()); }catch(_){ state=structuredClone(DEFAULT_STATE); }
  render();
  if('serviceWorker' in navigator && location.protocol!=='file:') navigator.serviceWorker.register('./sw.js?v=0.1.0').catch(()=>{});
}
init();
