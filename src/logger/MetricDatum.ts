/*
 * Copyright 2019 Amazon.com, Inc. or its affiliates.
 * Licensed under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

export class MetricDatum {
  public value: number | number[];
  public unit: string;

  constructor(value: number | number[], unit?: string) {
    this.value = value;
    this.unit = unit || 'None';
  }

  /**
   * Adds a new measurement value to this instance.
   * Calls to this will convert a scalar numeric value to
   * an array.
   *
   * @param newValue the value to append
   */
  public addMeasurement(newValue: number): void {
    if (Array.isArray(this.value)) {
      this.value.push(newValue);
    } else {
      this.value = [this.value, newValue];
    }
  }
}
