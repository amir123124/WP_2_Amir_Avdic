import { Injectable } from '@angular/core';
import { Firestore, collection, doc, addDoc, setDoc, getDoc, getDocs, updateDoc, deleteDoc, query, where } from '@angular/fire/firestore';
import { CollectionReference, DocumentData } from 'firebase/firestore';

@Injectable({ providedIn: 'root' }) // Čini servis dostupnim globalno u Angular aplikaciji
export class FirestoresService {
    constructor(private firestore: Firestore) {} // Injektuje Firestore servis iz AngularFire

    // Vraća referencu na kolekciju po imenu (path)
    col(path: string): CollectionReference<DocumentData> {
        return collection(this.firestore, path) as CollectionReference<DocumentData>;
    }

    // Dodaje novi dokument u kolekciju (ID se generiše automatski)
    add(path: string, data: unknown) {
        return addDoc(this.col(path), data as DocumentData);
    }

    // Kreira ili prepisuje dokument sa tačno određenim ID-em
    set(path: string, id: string, data: unknown) {
        return setDoc(doc(this.firestore, path, id), data as DocumentData);
    }

    // Dobija jedan dokument po ID-u, vraća podatke ili null ako ne postoji
    async get(path: string, id: string) {
        const snap = await getDoc(doc(this.firestore, path, id));
        return snap.exists() ? snap.data() : null;
    }

    // Vraća sve dokumente iz kolekcije, svaki objekat uključuje ID
    async list(path: string) {
        const snap = await getDocs(this.col(path));
        return snap.docs.map(d => ({ id: d.id, ...d.data() }));
    }

    // Ažurira postojeći dokument
    update(path: string, id: string, data: Partial<DocumentData>) {
        return updateDoc(doc(this.firestore, path, id), data);
    }

    // Briše dokument po ID-u
    delete(path: string, id: string) {
        return deleteDoc(doc(this.firestore, path, id));
    }

    // Pretraga dokumenta po određenom polju i vrijednosti
    async findBy(path: string, field: string, value: unknown) {
        const q = query(this.col(path), where(field, '==', value as any));
        const snap = await getDocs(q);
        return snap.docs.map(d => ({ id: d.id, ...d.data() }));
    }
}