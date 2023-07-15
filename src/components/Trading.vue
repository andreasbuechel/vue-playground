<script setup lang="ts">
import { NButton, NRadio, NSelect, NSpace, NRadioGroup } from 'naive-ui'
import { ref, computed } from 'vue'

type Pair = string
type Direction = 'BUY' | 'SELL'
type Price = string

const pairs = [
  { id: 'EURUSD', rate: 1.307 },
  { id: 'USDJPY', rate: 181 },
  { id: 'GBPUSD', rate: 1.307 },
  { id: 'AUDUSD', rate: 0.6861 },
  { id: 'USDCAD', rate: 1.316 },
  { id: 'USDCHF', rate: 0.8625 },
  { id: 'NZDUSD', rate: 0.6361 },
  { id: 'EURJPY', rate: 154.8 },
  { id: 'GBPJPY', rate: 138.5 }
]

const pairRates = Object.fromEntries(pairs.map(({ id, rate }) => [id, rate]))

function randomPrice(pair: Pair, dir: Direction) {
  let val = pairRates[pair] * (1 + Math.random() * 0.0001)
  val = dir === 'BUY' ? val : 1 / val
  return val.toPrecision(6)
}

const pair = ref<string | null>(null)
const direction = ref<Direction>('BUY')
const tickedPrice = ref<string | null>(null)
const trading = ref(false)
const tradedPrice = ref<Price | null>(null)

const ticking = computed(() => pair.value && !trading.value && tradedPrice.value === null)
const traded = computed(() => tradedPrice.value !== null)
const readyToTrade = computed(() => tickedPrice.value !== null && !trading.value && !traded.value)

setInterval(() => {
  if (ticking.value) {
    tickedPrice.value = randomPrice(pair.value!, direction.value)
  }
}, 500)

function onDirectionChange(inp: string) {
  direction.value = inp.toLowerCase() === 'buy' ? 'BUY' : 'SELL'
  tradedPrice.value = null
}

function onPairChange(inp: Pair) {
  pair.value = inp
  tickedPrice.value = null
  tradedPrice.value = null
}

function onTrade() {
  trading.value = true
  setTimeout(() => {
    tradedPrice.value = randomPrice(pair.value!, direction.value)
    trading.value = false
  }, 1000)
}
</script>

<template>
  <NSelect
    v-model:value="pair"
    :options="pairs.map(({ id }) => ({ value: id, label: id }))"
    placeholder="Pick a pair"
    searchable
    :disabled="trading"
    @update:value="onPairChange"
  />
  <NRadioGroup v-model:value="direction" @update:value="onDirectionChange" name="direction">
    <NSpace>
      <NRadio value="BUY">BUY</NRadio>
      <NRadio value="SELL">SELL</NRadio>
    </NSpace>
  </NRadioGroup>
  <div>
    <NButton v-if="pair" :disabled="!readyToTrade" @click="onTrade">{{
      tickedPrice || 'Fetching...'
    }}</NButton>
  </div>
  <!-- {pair &&
    <Button disabled={!readyToTrade} onClick={() => setTrading(true)}>
      {tickedPrice !== null ? tickedPrice : 'Fetching...'}
    </Button>
  } -->
  <div v-if="trading">Trading...</div>
  <div v-if="tradedPrice !== null">Traded at {{ tradedPrice }}</div>
</template>
