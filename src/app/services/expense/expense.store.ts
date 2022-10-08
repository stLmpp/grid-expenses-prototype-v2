import { Injectable } from '@angular/core';
import { createStore } from '@ngneat/elf';
import { entitiesPropsFactory, withEntities } from '@ngneat/elf-entities';
import { v4 } from 'uuid';

import { Expense } from '../../../../lib/expense';
import { Person } from '../../models/person';
import { createStoreProviders } from '../../shared/store/create-store-providers';

const { withPersonEntities, personEntitiesRef } = entitiesPropsFactory('person');

const store = createStore(
  {
    name: 'expense',
  },
  withEntities<Expense>(),
  withPersonEntities<Person>({
    initialValue: [
      { id: v4(), name: 'Karina' },
      { id: v4(), name: 'Guilherme' },
    ],
  })
);

const { Base, useFactory } = createStoreProviders(store, {
  history: true,
  extra: { personEntitiesRef },
});

@Injectable({ providedIn: 'root', useFactory })
export class ExpenseStore extends Base {}
