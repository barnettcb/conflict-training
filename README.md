# Personal Conflict Training Beta 0.2.0

Phone-first progressive web app for a stand-alone mindfulness and conflict-skills curriculum.

## New in 0.2.0

- Added **Foundation — Mindfulness & Attention**
  - F1 What Mindfulness Is
  - F2 Observe & Describe
  - F3 One-Mindful Attention
  - F4 Mindfulness in Interaction
- Kept and refined **Module 1 — Catch & Brake**
  - 1.1 Detecting Activation
  - 1.2 Recognizing the Defensive Shift
  - 1.3 STOP — Interrupt the Next Behavior
  - 1.4 Downshift Without Disengaging
  - 1.5 The Micro-Pause
- Added lesson-specific practice worksheets with local autosave.
- Added a reusable Practice tab for attention drills.
- Added a 4-digit passcode screen and 5-minute auto-lock.
- Added a privacy cover when the app is backgrounded.
- Removed paid pre-recorded RO-DBT class links.
- Removed RO-DBT Skills Manual purchase/publisher links.
- Did **not** duplicate Loving Kindness Meditation; that remains outside this app.
- Updated service-worker behavior so navigation checks the network first when online, improving future version updates.

## Data compatibility with 0.1.0

This build intentionally keeps the same IndexedDB database name, object store, state key, and Module 1 worksheet field keys used by 0.1.0. If 0.2.0 is uploaded to the **same GitHub Pages site/repository path** and opened on the same device/browser installation, existing Module 1 notes and completion data should carry forward.

The first launch after updating will ask you to create a 4-digit passcode.

Do not uninstall the Home Screen app or clear Safari website data before verifying that the old notes are still present. This version still has no backup/export feature.

## Updating the existing GitHub repository through the web

1. Download and unzip the 0.2.0 package.
2. Open the existing `conflict-training` repository on GitHub.
3. Choose **Add file > Upload files**.
4. Drag the files from inside the `conflict-training-beta-0.2.0` folder into the upload area, including the `icons` folder.
5. Allow GitHub to replace files with the same names.
6. Commit with a message such as `Update conflict training to beta 0.2.0`.
7. Wait for GitHub Pages to redeploy.
8. Open the installed app while online. If the old screen appears initially, close and reopen once after the deployment has completed.
9. Create the new 4-digit passcode.
10. Verify the three Lesson 1.1 practice records from 0.1.0 are still present.

## iPhone notes

- Designed for iPhone safe areas and Home Screen PWA use.
- Passcode is a practical privacy lock, not strong encryption.
- Local lesson content is cached for offline use after a successful online load.
- External resources require internet access.
- Local browser storage is not a backup.

## Sources

Lesson source maps identify the relevant RO-DBT and standard DBT handouts/worksheets by name and number. The app avoids redistributing copyrighted manual text and uses paraphrased educational explanations and custom practice integrations.
