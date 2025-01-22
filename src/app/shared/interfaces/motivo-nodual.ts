export interface MotivoNodual {
  id_motivo_nodual: string;
  id_tipo_entidad: number;
  motivo_nodual: string;
  observaciones?: string;

  fk_tipo_entidad: string;
}
