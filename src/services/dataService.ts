import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  setDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  orderBy, 
  onSnapshot,
  writeBatch
} from 'firebase/firestore';
import { db } from '../firebase';
import { Subject, Chapter } from '../types';
import { handleFirestoreError, OperationType } from '../lib/firestore-utils';

export const dataService = {
  // Subjects
  async getSubjects() {
    try {
      const q = query(collection(db, 'subjects'), orderBy('name'));
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Subject));
    } catch (error) {
      handleFirestoreError(error, OperationType.LIST, 'subjects');
      return [];
    }
  },

  subscribeSubjects(callback: (subjects: Subject[]) => void) {
    const q = query(collection(db, 'subjects'), orderBy('name'));
    return onSnapshot(q, (snapshot) => {
      callback(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Subject)));
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'subjects');
    });
  },

  async addSubject(subject: Partial<Subject>) {
    try {
      const id = subject.id || subject.name?.toLowerCase().replace(/\s+/g, '-') || Date.now().toString();
      await setDoc(doc(db, 'subjects', id), { ...subject, id });
      return id;
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, `subjects/${subject.id}`);
      throw error;
    }
  },

  async updateSubject(id: string, data: Partial<Subject>) {
    try {
      await updateDoc(doc(db, 'subjects', id), data);
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `subjects/${id}`);
      throw error;
    }
  },

  async deleteSubject(id: string) {
    try {
      await deleteDoc(doc(db, 'subjects', id));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `subjects/${id}`);
      throw error;
    }
  },

  // Chapters
  async getChapters(subjectId: string) {
    try {
      const q = query(collection(db, `subjects/${subjectId}/chapters`), orderBy('order'));
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Chapter));
    } catch (error) {
      handleFirestoreError(error, OperationType.LIST, `subjects/${subjectId}/chapters`);
      return [];
    }
  },

  subscribeChapters(subjectId: string, callback: (chapters: Chapter[]) => void) {
    const q = query(collection(db, `subjects/${subjectId}/chapters`), orderBy('order'));
    return onSnapshot(q, (snapshot) => {
      callback(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Chapter)));
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, `subjects/${subjectId}/chapters`);
    });
  },

  async saveChapter(subjectId: string, chapter: Partial<Chapter>) {
    try {
      const id = chapter.id || Date.now().toString();
      await setDoc(doc(db, `subjects/${subjectId}/chapters`, id), { ...chapter, id, subjectId });
      return id;
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, `subjects/${subjectId}/chapters/${chapter.id}`);
      throw error;
    }
  },

  async deleteChapter(subjectId: string, chapterId: string) {
    try {
      await deleteDoc(doc(db, `subjects/${subjectId}/chapters`, chapterId));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `subjects/${subjectId}/chapters/${chapterId}`);
      throw error;
    }
  },

  // Quizzes
  async getQuiz(chapterId: string) {
    try {
      const docSnap = await getDoc(doc(db, 'quizzes', chapterId));
      return docSnap.exists() ? docSnap.data() : null;
    } catch (error) {
      handleFirestoreError(error, OperationType.GET, `quizzes/${chapterId}`);
      return null;
    }
  },

  async saveQuiz(chapterId: string, questions: any[]) {
    try {
      await setDoc(doc(db, 'quizzes', chapterId), { chapterId, questions });
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, `quizzes/${chapterId}`);
      throw error;
    }
  },

  // Settings
  async getSettings() {
    try {
      const docSnap = await getDoc(doc(db, 'settings', 'global'));
      return docSnap.exists() ? docSnap.data() : null;
    } catch (error) {
      handleFirestoreError(error, OperationType.GET, 'settings/global');
      return null;
    }
  },

  async saveSettings(data: any) {
    try {
      await setDoc(doc(db, 'settings', 'global'), data, { merge: true });
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, 'settings/global');
      throw error;
    }
  },

  // Announcements
  subscribeAnnouncements(callback: (announcements: any[]) => void) {
    const q = query(collection(db, 'announcements'), orderBy('createdAt', 'desc'));
    return onSnapshot(q, (snapshot) => {
      callback(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'announcements');
    });
  },

  async addAnnouncement(data: any) {
    try {
      const id = Date.now().toString();
      await setDoc(doc(db, 'announcements', id), { ...data, id, createdAt: new Date().toISOString() });
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, 'announcements');
      throw error;
    }
  },

  async deleteAnnouncement(id: string) {
    try {
      await deleteDoc(doc(db, 'announcements', id));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `announcements/${id}`);
      throw error;
    }
  }
};
