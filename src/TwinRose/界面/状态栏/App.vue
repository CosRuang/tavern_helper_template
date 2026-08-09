<template>
  <div class="card">
    <div class="card__top" />

    <WorldBar />

    <TabNav v-model="active_tab" />

    <div class="content-area">
      <div v-if="active_tab === '伊莲娜'" class="tab-pane active">
        <CharacterPanel role="伊莲娜" accent="silk" />
      </div>
      <div v-else-if="active_tab === '里克'" class="tab-pane active">
        <CharacterPanel role="里克" accent="rose" />
      </div>
      <div v-else-if="active_tab === '城堡'" class="tab-pane active">
        <CastlePanel />
      </div>
    </div>

    <div class="card__bottom" />
  </div>
</template>

<script setup lang="ts">
import CastlePanel from './components/CastlePanel.vue';
import CharacterPanel from './components/CharacterPanel.vue';
import TabNav from './components/TabNav.vue';
import WorldBar from './components/WorldBar.vue';

const tabs = [
  { id: '伊莲娜', label: '伊莲娜' },
  { id: '里克', label: '里克' },
  { id: '城堡', label: '城堡档案' },
];

const active_tab = useLocalStorage<string | null>('twinrose:active_tab', '伊莲娜');
</script>

<style lang="scss" scoped>
.card {
  width: 100%;
  max-width: 760px;
  margin: 0 auto;
  background:
    linear-gradient(180deg, rgba(184, 134, 11, 0.06) 0%, transparent 24%),
    var(--c-surface);
  border: 1px solid var(--c-border);
  border-top: 2px solid var(--c-primary);
  box-shadow: 0 6px 24px rgba(0, 0, 0, 0.55);
  display: flex;
  flex-direction: column;
  font-family: var(--font-body);
  color: var(--c-text);
}

.card__top {
  height: 3px;
  background: repeating-linear-gradient(90deg, var(--c-primary) 0 18px, transparent 18px 30px);
  opacity: 0.5;
}

.content-area {
  padding: 12px 14px 14px;
  min-height: 120px;
}

.tab-pane {
  display: none;
  animation: fadeEffect 0.35s ease;
}

.tab-pane.active {
  display: block;
}

@keyframes fadeEffect {
  from {
    opacity: 0;
    transform: translateY(4px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
