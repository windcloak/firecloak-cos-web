import { Service } from '@angular/core';
import { collection, doc, getDoc, getDocs, limit, orderBy, query } from 'firebase/firestore';
import { firestore } from './firebase';
import { TutorialDetails } from './tutorial-models';

const COLLECTION = 'tutorials';

// Named TutorialsService (rather than just "Tutorials", matching
// Cosplays) because the tutorials list page component is itself named
// Tutorials to match its route path — same name would collide in that
// file's imports.
@Service()
export class TutorialsService {
  async list(): Promise<TutorialDetails[]> {
    const snapshot = await getDocs(
      query(collection(firestore, COLLECTION), orderBy('order', 'desc')),
    );
    return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }) as TutorialDetails);
  }

  // Most recent few, for a home page preview section.
  async preview(count = 4): Promise<TutorialDetails[]> {
    const snapshot = await getDocs(
      query(collection(firestore, COLLECTION), orderBy('order', 'desc'), limit(count)),
    );
    return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }) as TutorialDetails);
  }

  async byId(id: string): Promise<TutorialDetails | undefined> {
    const snapshot = await getDoc(doc(firestore, COLLECTION, id));
    return snapshot.exists()
      ? ({ id: snapshot.id, ...snapshot.data() } as TutorialDetails)
      : undefined;
  }
}
