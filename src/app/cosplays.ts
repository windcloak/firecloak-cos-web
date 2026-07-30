import { Service } from '@angular/core';
import { collection, doc, getDoc, getDocs, limit, orderBy, query } from 'firebase/firestore';
import { firestore } from './firebase';
import { CosplayDetails } from './cosplay-models';

const COLLECTION = 'cosplay';

// Plain data-access methods, not resource()s themselves — each
// component that needs one wraps a call in its own resource(), so
// loading/error state stays scoped to wherever it's actually used
// (list page vs. preview vs. detail page) instead of being shared
// and potentially stale across them.
@Service()
export class Cosplays {
  async list(): Promise<CosplayDetails[]> {
    const snapshot = await getDocs(
      query(collection(firestore, COLLECTION), orderBy('order', 'desc')),
    );
    return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }) as CosplayDetails);
  }

  // Most recent few, for a home page preview section.
  async preview(count = 4): Promise<CosplayDetails[]> {
    const snapshot = await getDocs(
      query(collection(firestore, COLLECTION), orderBy('order', 'desc'), limit(count)),
    );
    return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }) as CosplayDetails);
  }

  async byId(id: string): Promise<CosplayDetails | undefined> {
    const snapshot = await getDoc(doc(firestore, COLLECTION, id));
    return snapshot.exists() ? ({ id: snapshot.id, ...snapshot.data() } as CosplayDetails) : undefined;
  }
}
