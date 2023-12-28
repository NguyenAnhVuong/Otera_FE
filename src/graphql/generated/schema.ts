import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  date: { input: any; output: any; }
  event_participant_types_role_enum: { input: any; output: any; }
  event_paticipants_booking_status_enum: { input: any; output: any; }
  events_priority_enum: { input: any; output: any; }
  families_status_enum: { input: any; output: any; }
  temples_plan_enum: { input: any; output: any; }
  temples_priority_enum: { input: any; output: any; }
  temples_status_enum: { input: any; output: any; }
  timestamp: { input: any; output: any; }
  user_details_gender_enum: { input: any; output: any; }
  users_role_enum: { input: any; output: any; }
};

export type AuthUser = {
  __typename?: 'AuthUser';
  avatar: Scalars['String']['output'];
  email: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  role?: Maybe<ERole>;
};

export enum EPlan {
  Enterprise = 'ENTERPRISE',
  Free = 'FREE',
  Premium = 'PREMIUM'
}

export enum EPriority {
  High = 'HIGH',
  Low = 'LOW',
  Medium = 'MEDIUM'
}

export enum ERole {
  FamilyAdmin = 'FAMILY_ADMIN',
  FamilyMember = 'FAMILY_MEMBER',
  PublicUser = 'PUBLIC_USER',
  System = 'SYSTEM',
  TempleAdmin = 'TEMPLE_ADMIN'
}

export enum EStatus {
  Active = 'ACTIVE',
  Inactive = 'INACTIVE'
}

export type GetTempleByIdInput = {
  id?: InputMaybe<Scalars['Int']['input']>;
};

export type GetTempleByIdOutput = {
  __typename?: 'GetTempleByIdOutput';
  data?: Maybe<GetTempleByIdOutputData>;
  errorCode?: Maybe<Scalars['String']['output']>;
  errorMessage?: Maybe<Scalars['String']['output']>;
  statusCode?: Maybe<Scalars['Int']['output']>;
  timestamp?: Maybe<Scalars['String']['output']>;
};

export type GetTempleByIdOutputData = {
  __typename?: 'GetTempleByIdOutputData';
  address: Scalars['String']['output'];
  adminId: Scalars['Int']['output'];
  avatar: Scalars['String']['output'];
  createdAt: Scalars['String']['output'];
  description: Scalars['String']['output'];
  email?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  images?: Maybe<Array<Maybe<Image>>>;
  name: Scalars['String']['output'];
  phone?: Maybe<Scalars['String']['output']>;
  plan: EPlan;
  planExpired?: Maybe<Scalars['String']['output']>;
  priority: EPriority;
  priorityExpired?: Maybe<Scalars['String']['output']>;
  status: EStatus;
  updatedAt: Scalars['String']['output'];
  website?: Maybe<Scalars['String']['output']>;
};

export type GetTemplesInput = {
  keyword?: InputMaybe<Scalars['String']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};

export type GetTemplesOutput = {
  __typename?: 'GetTemplesOutput';
  data?: Maybe<GetTemplesOutputData>;
  errorCode?: Maybe<Scalars['String']['output']>;
  errorMessage?: Maybe<Scalars['String']['output']>;
  statusCode?: Maybe<Scalars['Int']['output']>;
  timestamp?: Maybe<Scalars['String']['output']>;
};

export type GetTemplesOutputData = {
  __typename?: 'GetTemplesOutputData';
  data?: Maybe<Array<Maybe<Temple>>>;
  page?: Maybe<Scalars['Int']['output']>;
  take?: Maybe<Scalars['Int']['output']>;
  totalItems?: Maybe<Scalars['Int']['output']>;
  totalPages?: Maybe<Scalars['Int']['output']>;
};

export type Image = {
  __typename?: 'Image';
  createdAt: Scalars['String']['output'];
  deceasedId?: Maybe<Scalars['Int']['output']>;
  eventId?: Maybe<Scalars['Int']['output']>;
  id: Scalars['Int']['output'];
  image: Scalars['String']['output'];
  templeId?: Maybe<Scalars['Int']['output']>;
  updatedAt: Scalars['String']['output'];
};

/** Boolean expression to compare columns of type "Int". All fields are combined with logical 'AND'. */
export type Int_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['Int']['input']>;
  _gt?: InputMaybe<Scalars['Int']['input']>;
  _gte?: InputMaybe<Scalars['Int']['input']>;
  _in?: InputMaybe<Array<Scalars['Int']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['Int']['input']>;
  _lte?: InputMaybe<Scalars['Int']['input']>;
  _neq?: InputMaybe<Scalars['Int']['input']>;
  _nin?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export type RefreshTokenInput = {
  refreshToken: Scalars['String']['input'];
};

export type RefreshTokenOutput = {
  __typename?: 'RefreshTokenOutput';
  data?: Maybe<RefreshTokenOutputData>;
  errorCode?: Maybe<Scalars['String']['output']>;
  errorMessage?: Maybe<Scalars['String']['output']>;
  statusCode?: Maybe<Scalars['Int']['output']>;
  timestamp?: Maybe<Scalars['String']['output']>;
};

export type RefreshTokenOutputData = {
  __typename?: 'RefreshTokenOutputData';
  accessToken: Scalars['String']['output'];
  refreshToken: Scalars['String']['output'];
};

/** Boolean expression to compare columns of type "String". All fields are combined with logical 'AND'. */
export type String_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['String']['input']>;
  _gt?: InputMaybe<Scalars['String']['input']>;
  _gte?: InputMaybe<Scalars['String']['input']>;
  /** does the column match the given case-insensitive pattern */
  _ilike?: InputMaybe<Scalars['String']['input']>;
  _in?: InputMaybe<Array<Scalars['String']['input']>>;
  /** does the column match the given POSIX regular expression, case insensitive */
  _iregex?: InputMaybe<Scalars['String']['input']>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  /** does the column match the given pattern */
  _like?: InputMaybe<Scalars['String']['input']>;
  _lt?: InputMaybe<Scalars['String']['input']>;
  _lte?: InputMaybe<Scalars['String']['input']>;
  _neq?: InputMaybe<Scalars['String']['input']>;
  /** does the column NOT match the given case-insensitive pattern */
  _nilike?: InputMaybe<Scalars['String']['input']>;
  _nin?: InputMaybe<Array<Scalars['String']['input']>>;
  /** does the column NOT match the given POSIX regular expression, case insensitive */
  _niregex?: InputMaybe<Scalars['String']['input']>;
  /** does the column NOT match the given pattern */
  _nlike?: InputMaybe<Scalars['String']['input']>;
  /** does the column NOT match the given POSIX regular expression, case sensitive */
  _nregex?: InputMaybe<Scalars['String']['input']>;
  /** does the column NOT match the given SQL regular expression */
  _nsimilar?: InputMaybe<Scalars['String']['input']>;
  /** does the column match the given POSIX regular expression, case sensitive */
  _regex?: InputMaybe<Scalars['String']['input']>;
  /** does the column match the given SQL regular expression */
  _similar?: InputMaybe<Scalars['String']['input']>;
};

export type Temple = {
  __typename?: 'Temple';
  address: Scalars['String']['output'];
  adminId: Scalars['Int']['output'];
  avatar: Scalars['String']['output'];
  createdAt: Scalars['String']['output'];
  description: Scalars['String']['output'];
  email?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  phone?: Maybe<Scalars['String']['output']>;
  plan: EPlan;
  planExpired?: Maybe<Scalars['String']['output']>;
  priority: EPriority;
  priorityExpired?: Maybe<Scalars['String']['output']>;
  status: EStatus;
  updatedAt: Scalars['String']['output'];
  website?: Maybe<Scalars['String']['output']>;
};

export type UserLoginInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type UserLoginOutput = {
  __typename?: 'UserLoginOutput';
  data?: Maybe<UserLoginOutputData>;
  errorCode?: Maybe<Scalars['String']['output']>;
  errorMessage?: Maybe<Scalars['String']['output']>;
  statusCode?: Maybe<Scalars['Int']['output']>;
  timestamp?: Maybe<Scalars['String']['output']>;
};

export type UserLoginOutputData = {
  __typename?: 'UserLoginOutputData';
  accessToken: Scalars['String']['output'];
  refreshToken: Scalars['String']['output'];
  user: AuthUser;
};

export type UserRegisterInput = {
  birthday: Scalars['date']['input'];
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
  role?: InputMaybe<ERole>;
};

export type UserRegisterOutput = {
  __typename?: 'UserRegisterOutput';
  data?: Maybe<UserRegisterOutputData>;
  errorCode?: Maybe<Scalars['String']['output']>;
  errorMessage?: Maybe<Scalars['String']['output']>;
  statusCode?: Maybe<Scalars['Int']['output']>;
  timestamp?: Maybe<Scalars['String']['output']>;
};

export type UserRegisterOutputData = {
  __typename?: 'UserRegisterOutputData';
  birthday?: Maybe<Scalars['date']['output']>;
  createdAt?: Maybe<Scalars['date']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  familyId?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  refreshToken?: Maybe<Scalars['String']['output']>;
  role?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['date']['output']>;
  userDetailId?: Maybe<Scalars['Int']['output']>;
};

/** ordering argument of a cursor */
export enum Cursor_Ordering {
  /** ascending ordering of the cursor */
  Asc = 'ASC',
  /** descending ordering of the cursor */
  Desc = 'DESC'
}

/** Boolean expression to compare columns of type "date". All fields are combined with logical 'AND'. */
export type Date_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['date']['input']>;
  _gt?: InputMaybe<Scalars['date']['input']>;
  _gte?: InputMaybe<Scalars['date']['input']>;
  _in?: InputMaybe<Array<Scalars['date']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['date']['input']>;
  _lte?: InputMaybe<Scalars['date']['input']>;
  _neq?: InputMaybe<Scalars['date']['input']>;
  _nin?: InputMaybe<Array<Scalars['date']['input']>>;
};

/** columns and relationships of "deceased" */
export type Deceased = {
  __typename?: 'deceased';
  created_at: Scalars['timestamp']['output'];
  creator_id: Scalars['Int']['output'];
  date_of_death: Scalars['date']['output'];
  /** An object relationship */
  family: Families;
  family_id: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  /** An array relationship */
  images: Array<Images>;
  /** An aggregate relationship */
  images_aggregate: Images_Aggregate;
  /** An object relationship */
  temple: Temples;
  temple_id: Scalars['Int']['output'];
  updated_at: Scalars['timestamp']['output'];
  /** An object relationship */
  user_detail?: Maybe<User_Details>;
  user_detail_id?: Maybe<Scalars['Int']['output']>;
};


/** columns and relationships of "deceased" */
export type DeceasedImagesArgs = {
  distinct_on?: InputMaybe<Array<Images_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Images_Order_By>>;
  where?: InputMaybe<Images_Bool_Exp>;
};


/** columns and relationships of "deceased" */
export type DeceasedImages_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Images_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Images_Order_By>>;
  where?: InputMaybe<Images_Bool_Exp>;
};

/** aggregated selection of "deceased" */
export type Deceased_Aggregate = {
  __typename?: 'deceased_aggregate';
  aggregate?: Maybe<Deceased_Aggregate_Fields>;
  nodes: Array<Deceased>;
};

export type Deceased_Aggregate_Bool_Exp = {
  count?: InputMaybe<Deceased_Aggregate_Bool_Exp_Count>;
};

export type Deceased_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Deceased_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Deceased_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "deceased" */
export type Deceased_Aggregate_Fields = {
  __typename?: 'deceased_aggregate_fields';
  avg?: Maybe<Deceased_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Deceased_Max_Fields>;
  min?: Maybe<Deceased_Min_Fields>;
  stddev?: Maybe<Deceased_Stddev_Fields>;
  stddev_pop?: Maybe<Deceased_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Deceased_Stddev_Samp_Fields>;
  sum?: Maybe<Deceased_Sum_Fields>;
  var_pop?: Maybe<Deceased_Var_Pop_Fields>;
  var_samp?: Maybe<Deceased_Var_Samp_Fields>;
  variance?: Maybe<Deceased_Variance_Fields>;
};


/** aggregate fields of "deceased" */
export type Deceased_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Deceased_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "deceased" */
export type Deceased_Aggregate_Order_By = {
  avg?: InputMaybe<Deceased_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Deceased_Max_Order_By>;
  min?: InputMaybe<Deceased_Min_Order_By>;
  stddev?: InputMaybe<Deceased_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Deceased_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Deceased_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Deceased_Sum_Order_By>;
  var_pop?: InputMaybe<Deceased_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Deceased_Var_Samp_Order_By>;
  variance?: InputMaybe<Deceased_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "deceased" */
export type Deceased_Arr_Rel_Insert_Input = {
  data: Array<Deceased_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Deceased_On_Conflict>;
};

/** aggregate avg on columns */
export type Deceased_Avg_Fields = {
  __typename?: 'deceased_avg_fields';
  creator_id?: Maybe<Scalars['Float']['output']>;
  family_id?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  temple_id?: Maybe<Scalars['Float']['output']>;
  user_detail_id?: Maybe<Scalars['Float']['output']>;
};

/** order by avg() on columns of table "deceased" */
export type Deceased_Avg_Order_By = {
  creator_id?: InputMaybe<Order_By>;
  family_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  temple_id?: InputMaybe<Order_By>;
  user_detail_id?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "deceased". All fields are combined with a logical 'AND'. */
export type Deceased_Bool_Exp = {
  _and?: InputMaybe<Array<Deceased_Bool_Exp>>;
  _not?: InputMaybe<Deceased_Bool_Exp>;
  _or?: InputMaybe<Array<Deceased_Bool_Exp>>;
  created_at?: InputMaybe<Timestamp_Comparison_Exp>;
  creator_id?: InputMaybe<Int_Comparison_Exp>;
  date_of_death?: InputMaybe<Date_Comparison_Exp>;
  family?: InputMaybe<Families_Bool_Exp>;
  family_id?: InputMaybe<Int_Comparison_Exp>;
  id?: InputMaybe<Int_Comparison_Exp>;
  images?: InputMaybe<Images_Bool_Exp>;
  images_aggregate?: InputMaybe<Images_Aggregate_Bool_Exp>;
  temple?: InputMaybe<Temples_Bool_Exp>;
  temple_id?: InputMaybe<Int_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamp_Comparison_Exp>;
  user_detail?: InputMaybe<User_Details_Bool_Exp>;
  user_detail_id?: InputMaybe<Int_Comparison_Exp>;
};

/** unique or primary key constraints on table "deceased" */
export enum Deceased_Constraint {
  /** unique or primary key constraint on columns "id" */
  PkD21a1fbc3aac9affa45b657a572 = 'PK_d21a1fbc3aac9affa45b657a572',
  /** unique or primary key constraint on columns "user_detail_id" */
  Rel_7609852a09807fe9418cad3761 = 'REL_7609852a09807fe9418cad3761'
}

/** input type for incrementing numeric columns in table "deceased" */
export type Deceased_Inc_Input = {
  creator_id?: InputMaybe<Scalars['Int']['input']>;
  family_id?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  temple_id?: InputMaybe<Scalars['Int']['input']>;
  user_detail_id?: InputMaybe<Scalars['Int']['input']>;
};

/** input type for inserting data into table "deceased" */
export type Deceased_Insert_Input = {
  created_at?: InputMaybe<Scalars['timestamp']['input']>;
  creator_id?: InputMaybe<Scalars['Int']['input']>;
  date_of_death?: InputMaybe<Scalars['date']['input']>;
  family?: InputMaybe<Families_Obj_Rel_Insert_Input>;
  family_id?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  images?: InputMaybe<Images_Arr_Rel_Insert_Input>;
  temple?: InputMaybe<Temples_Obj_Rel_Insert_Input>;
  temple_id?: InputMaybe<Scalars['Int']['input']>;
  updated_at?: InputMaybe<Scalars['timestamp']['input']>;
  user_detail?: InputMaybe<User_Details_Obj_Rel_Insert_Input>;
  user_detail_id?: InputMaybe<Scalars['Int']['input']>;
};

/** aggregate max on columns */
export type Deceased_Max_Fields = {
  __typename?: 'deceased_max_fields';
  created_at?: Maybe<Scalars['timestamp']['output']>;
  creator_id?: Maybe<Scalars['Int']['output']>;
  date_of_death?: Maybe<Scalars['date']['output']>;
  family_id?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  temple_id?: Maybe<Scalars['Int']['output']>;
  updated_at?: Maybe<Scalars['timestamp']['output']>;
  user_detail_id?: Maybe<Scalars['Int']['output']>;
};

/** order by max() on columns of table "deceased" */
export type Deceased_Max_Order_By = {
  created_at?: InputMaybe<Order_By>;
  creator_id?: InputMaybe<Order_By>;
  date_of_death?: InputMaybe<Order_By>;
  family_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  temple_id?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  user_detail_id?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Deceased_Min_Fields = {
  __typename?: 'deceased_min_fields';
  created_at?: Maybe<Scalars['timestamp']['output']>;
  creator_id?: Maybe<Scalars['Int']['output']>;
  date_of_death?: Maybe<Scalars['date']['output']>;
  family_id?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  temple_id?: Maybe<Scalars['Int']['output']>;
  updated_at?: Maybe<Scalars['timestamp']['output']>;
  user_detail_id?: Maybe<Scalars['Int']['output']>;
};

/** order by min() on columns of table "deceased" */
export type Deceased_Min_Order_By = {
  created_at?: InputMaybe<Order_By>;
  creator_id?: InputMaybe<Order_By>;
  date_of_death?: InputMaybe<Order_By>;
  family_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  temple_id?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  user_detail_id?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "deceased" */
export type Deceased_Mutation_Response = {
  __typename?: 'deceased_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Deceased>;
};

/** input type for inserting object relation for remote table "deceased" */
export type Deceased_Obj_Rel_Insert_Input = {
  data: Deceased_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Deceased_On_Conflict>;
};

/** on_conflict condition type for table "deceased" */
export type Deceased_On_Conflict = {
  constraint: Deceased_Constraint;
  update_columns?: Array<Deceased_Update_Column>;
  where?: InputMaybe<Deceased_Bool_Exp>;
};

/** Ordering options when selecting data from "deceased". */
export type Deceased_Order_By = {
  created_at?: InputMaybe<Order_By>;
  creator_id?: InputMaybe<Order_By>;
  date_of_death?: InputMaybe<Order_By>;
  family?: InputMaybe<Families_Order_By>;
  family_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  images_aggregate?: InputMaybe<Images_Aggregate_Order_By>;
  temple?: InputMaybe<Temples_Order_By>;
  temple_id?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  user_detail?: InputMaybe<User_Details_Order_By>;
  user_detail_id?: InputMaybe<Order_By>;
};

/** primary key columns input for table: deceased */
export type Deceased_Pk_Columns_Input = {
  id: Scalars['Int']['input'];
};

/** select columns of table "deceased" */
export enum Deceased_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  CreatorId = 'creator_id',
  /** column name */
  DateOfDeath = 'date_of_death',
  /** column name */
  FamilyId = 'family_id',
  /** column name */
  Id = 'id',
  /** column name */
  TempleId = 'temple_id',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  UserDetailId = 'user_detail_id'
}

/** input type for updating data in table "deceased" */
export type Deceased_Set_Input = {
  created_at?: InputMaybe<Scalars['timestamp']['input']>;
  creator_id?: InputMaybe<Scalars['Int']['input']>;
  date_of_death?: InputMaybe<Scalars['date']['input']>;
  family_id?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  temple_id?: InputMaybe<Scalars['Int']['input']>;
  updated_at?: InputMaybe<Scalars['timestamp']['input']>;
  user_detail_id?: InputMaybe<Scalars['Int']['input']>;
};

/** aggregate stddev on columns */
export type Deceased_Stddev_Fields = {
  __typename?: 'deceased_stddev_fields';
  creator_id?: Maybe<Scalars['Float']['output']>;
  family_id?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  temple_id?: Maybe<Scalars['Float']['output']>;
  user_detail_id?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev() on columns of table "deceased" */
export type Deceased_Stddev_Order_By = {
  creator_id?: InputMaybe<Order_By>;
  family_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  temple_id?: InputMaybe<Order_By>;
  user_detail_id?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Deceased_Stddev_Pop_Fields = {
  __typename?: 'deceased_stddev_pop_fields';
  creator_id?: Maybe<Scalars['Float']['output']>;
  family_id?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  temple_id?: Maybe<Scalars['Float']['output']>;
  user_detail_id?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_pop() on columns of table "deceased" */
export type Deceased_Stddev_Pop_Order_By = {
  creator_id?: InputMaybe<Order_By>;
  family_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  temple_id?: InputMaybe<Order_By>;
  user_detail_id?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Deceased_Stddev_Samp_Fields = {
  __typename?: 'deceased_stddev_samp_fields';
  creator_id?: Maybe<Scalars['Float']['output']>;
  family_id?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  temple_id?: Maybe<Scalars['Float']['output']>;
  user_detail_id?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_samp() on columns of table "deceased" */
export type Deceased_Stddev_Samp_Order_By = {
  creator_id?: InputMaybe<Order_By>;
  family_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  temple_id?: InputMaybe<Order_By>;
  user_detail_id?: InputMaybe<Order_By>;
};

/** Streaming cursor of the table "deceased" */
export type Deceased_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Deceased_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Deceased_Stream_Cursor_Value_Input = {
  created_at?: InputMaybe<Scalars['timestamp']['input']>;
  creator_id?: InputMaybe<Scalars['Int']['input']>;
  date_of_death?: InputMaybe<Scalars['date']['input']>;
  family_id?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  temple_id?: InputMaybe<Scalars['Int']['input']>;
  updated_at?: InputMaybe<Scalars['timestamp']['input']>;
  user_detail_id?: InputMaybe<Scalars['Int']['input']>;
};

/** aggregate sum on columns */
export type Deceased_Sum_Fields = {
  __typename?: 'deceased_sum_fields';
  creator_id?: Maybe<Scalars['Int']['output']>;
  family_id?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  temple_id?: Maybe<Scalars['Int']['output']>;
  user_detail_id?: Maybe<Scalars['Int']['output']>;
};

/** order by sum() on columns of table "deceased" */
export type Deceased_Sum_Order_By = {
  creator_id?: InputMaybe<Order_By>;
  family_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  temple_id?: InputMaybe<Order_By>;
  user_detail_id?: InputMaybe<Order_By>;
};

/** update columns of table "deceased" */
export enum Deceased_Update_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  CreatorId = 'creator_id',
  /** column name */
  DateOfDeath = 'date_of_death',
  /** column name */
  FamilyId = 'family_id',
  /** column name */
  Id = 'id',
  /** column name */
  TempleId = 'temple_id',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  UserDetailId = 'user_detail_id'
}

export type Deceased_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Deceased_Inc_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Deceased_Set_Input>;
  /** filter the rows which have to be updated */
  where: Deceased_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Deceased_Var_Pop_Fields = {
  __typename?: 'deceased_var_pop_fields';
  creator_id?: Maybe<Scalars['Float']['output']>;
  family_id?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  temple_id?: Maybe<Scalars['Float']['output']>;
  user_detail_id?: Maybe<Scalars['Float']['output']>;
};

/** order by var_pop() on columns of table "deceased" */
export type Deceased_Var_Pop_Order_By = {
  creator_id?: InputMaybe<Order_By>;
  family_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  temple_id?: InputMaybe<Order_By>;
  user_detail_id?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Deceased_Var_Samp_Fields = {
  __typename?: 'deceased_var_samp_fields';
  creator_id?: Maybe<Scalars['Float']['output']>;
  family_id?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  temple_id?: Maybe<Scalars['Float']['output']>;
  user_detail_id?: Maybe<Scalars['Float']['output']>;
};

/** order by var_samp() on columns of table "deceased" */
export type Deceased_Var_Samp_Order_By = {
  creator_id?: InputMaybe<Order_By>;
  family_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  temple_id?: InputMaybe<Order_By>;
  user_detail_id?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Deceased_Variance_Fields = {
  __typename?: 'deceased_variance_fields';
  creator_id?: Maybe<Scalars['Float']['output']>;
  family_id?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  temple_id?: Maybe<Scalars['Float']['output']>;
  user_detail_id?: Maybe<Scalars['Float']['output']>;
};

/** order by variance() on columns of table "deceased" */
export type Deceased_Variance_Order_By = {
  creator_id?: InputMaybe<Order_By>;
  family_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  temple_id?: InputMaybe<Order_By>;
  user_detail_id?: InputMaybe<Order_By>;
};

/** columns and relationships of "event_participant_types" */
export type Event_Participant_Types = {
  __typename?: 'event_participant_types';
  created_at: Scalars['timestamp']['output'];
  event_id: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  role: Scalars['event_participant_types_role_enum']['output'];
  updated_at: Scalars['timestamp']['output'];
};

/** aggregated selection of "event_participant_types" */
export type Event_Participant_Types_Aggregate = {
  __typename?: 'event_participant_types_aggregate';
  aggregate?: Maybe<Event_Participant_Types_Aggregate_Fields>;
  nodes: Array<Event_Participant_Types>;
};

/** aggregate fields of "event_participant_types" */
export type Event_Participant_Types_Aggregate_Fields = {
  __typename?: 'event_participant_types_aggregate_fields';
  avg?: Maybe<Event_Participant_Types_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Event_Participant_Types_Max_Fields>;
  min?: Maybe<Event_Participant_Types_Min_Fields>;
  stddev?: Maybe<Event_Participant_Types_Stddev_Fields>;
  stddev_pop?: Maybe<Event_Participant_Types_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Event_Participant_Types_Stddev_Samp_Fields>;
  sum?: Maybe<Event_Participant_Types_Sum_Fields>;
  var_pop?: Maybe<Event_Participant_Types_Var_Pop_Fields>;
  var_samp?: Maybe<Event_Participant_Types_Var_Samp_Fields>;
  variance?: Maybe<Event_Participant_Types_Variance_Fields>;
};


/** aggregate fields of "event_participant_types" */
export type Event_Participant_Types_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Event_Participant_Types_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** aggregate avg on columns */
export type Event_Participant_Types_Avg_Fields = {
  __typename?: 'event_participant_types_avg_fields';
  event_id?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
};

/** Boolean expression to filter rows from the table "event_participant_types". All fields are combined with a logical 'AND'. */
export type Event_Participant_Types_Bool_Exp = {
  _and?: InputMaybe<Array<Event_Participant_Types_Bool_Exp>>;
  _not?: InputMaybe<Event_Participant_Types_Bool_Exp>;
  _or?: InputMaybe<Array<Event_Participant_Types_Bool_Exp>>;
  created_at?: InputMaybe<Timestamp_Comparison_Exp>;
  event_id?: InputMaybe<Int_Comparison_Exp>;
  id?: InputMaybe<Int_Comparison_Exp>;
  role?: InputMaybe<Event_Participant_Types_Role_Enum_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamp_Comparison_Exp>;
};

/** unique or primary key constraints on table "event_participant_types" */
export enum Event_Participant_Types_Constraint {
  /** unique or primary key constraint on columns "id" */
  Pk_98b3d1c125c2fe3f791bd8a3262 = 'PK_98b3d1c125c2fe3f791bd8a3262'
}

/** input type for incrementing numeric columns in table "event_participant_types" */
export type Event_Participant_Types_Inc_Input = {
  event_id?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
};

/** input type for inserting data into table "event_participant_types" */
export type Event_Participant_Types_Insert_Input = {
  created_at?: InputMaybe<Scalars['timestamp']['input']>;
  event_id?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  role?: InputMaybe<Scalars['event_participant_types_role_enum']['input']>;
  updated_at?: InputMaybe<Scalars['timestamp']['input']>;
};

/** aggregate max on columns */
export type Event_Participant_Types_Max_Fields = {
  __typename?: 'event_participant_types_max_fields';
  created_at?: Maybe<Scalars['timestamp']['output']>;
  event_id?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  role?: Maybe<Scalars['event_participant_types_role_enum']['output']>;
  updated_at?: Maybe<Scalars['timestamp']['output']>;
};

/** aggregate min on columns */
export type Event_Participant_Types_Min_Fields = {
  __typename?: 'event_participant_types_min_fields';
  created_at?: Maybe<Scalars['timestamp']['output']>;
  event_id?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  role?: Maybe<Scalars['event_participant_types_role_enum']['output']>;
  updated_at?: Maybe<Scalars['timestamp']['output']>;
};

/** response of any mutation on the table "event_participant_types" */
export type Event_Participant_Types_Mutation_Response = {
  __typename?: 'event_participant_types_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Event_Participant_Types>;
};

/** on_conflict condition type for table "event_participant_types" */
export type Event_Participant_Types_On_Conflict = {
  constraint: Event_Participant_Types_Constraint;
  update_columns?: Array<Event_Participant_Types_Update_Column>;
  where?: InputMaybe<Event_Participant_Types_Bool_Exp>;
};

/** Ordering options when selecting data from "event_participant_types". */
export type Event_Participant_Types_Order_By = {
  created_at?: InputMaybe<Order_By>;
  event_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  role?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** primary key columns input for table: event_participant_types */
export type Event_Participant_Types_Pk_Columns_Input = {
  id: Scalars['Int']['input'];
};

/** Boolean expression to compare columns of type "event_participant_types_role_enum". All fields are combined with logical 'AND'. */
export type Event_Participant_Types_Role_Enum_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['event_participant_types_role_enum']['input']>;
  _gt?: InputMaybe<Scalars['event_participant_types_role_enum']['input']>;
  _gte?: InputMaybe<Scalars['event_participant_types_role_enum']['input']>;
  _in?: InputMaybe<Array<Scalars['event_participant_types_role_enum']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['event_participant_types_role_enum']['input']>;
  _lte?: InputMaybe<Scalars['event_participant_types_role_enum']['input']>;
  _neq?: InputMaybe<Scalars['event_participant_types_role_enum']['input']>;
  _nin?: InputMaybe<Array<Scalars['event_participant_types_role_enum']['input']>>;
};

/** select columns of table "event_participant_types" */
export enum Event_Participant_Types_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  EventId = 'event_id',
  /** column name */
  Id = 'id',
  /** column name */
  Role = 'role',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** input type for updating data in table "event_participant_types" */
export type Event_Participant_Types_Set_Input = {
  created_at?: InputMaybe<Scalars['timestamp']['input']>;
  event_id?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  role?: InputMaybe<Scalars['event_participant_types_role_enum']['input']>;
  updated_at?: InputMaybe<Scalars['timestamp']['input']>;
};

/** aggregate stddev on columns */
export type Event_Participant_Types_Stddev_Fields = {
  __typename?: 'event_participant_types_stddev_fields';
  event_id?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_pop on columns */
export type Event_Participant_Types_Stddev_Pop_Fields = {
  __typename?: 'event_participant_types_stddev_pop_fields';
  event_id?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_samp on columns */
export type Event_Participant_Types_Stddev_Samp_Fields = {
  __typename?: 'event_participant_types_stddev_samp_fields';
  event_id?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
};

/** Streaming cursor of the table "event_participant_types" */
export type Event_Participant_Types_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Event_Participant_Types_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Event_Participant_Types_Stream_Cursor_Value_Input = {
  created_at?: InputMaybe<Scalars['timestamp']['input']>;
  event_id?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  role?: InputMaybe<Scalars['event_participant_types_role_enum']['input']>;
  updated_at?: InputMaybe<Scalars['timestamp']['input']>;
};

/** aggregate sum on columns */
export type Event_Participant_Types_Sum_Fields = {
  __typename?: 'event_participant_types_sum_fields';
  event_id?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
};

/** update columns of table "event_participant_types" */
export enum Event_Participant_Types_Update_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  EventId = 'event_id',
  /** column name */
  Id = 'id',
  /** column name */
  Role = 'role',
  /** column name */
  UpdatedAt = 'updated_at'
}

export type Event_Participant_Types_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Event_Participant_Types_Inc_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Event_Participant_Types_Set_Input>;
  /** filter the rows which have to be updated */
  where: Event_Participant_Types_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Event_Participant_Types_Var_Pop_Fields = {
  __typename?: 'event_participant_types_var_pop_fields';
  event_id?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
};

/** aggregate var_samp on columns */
export type Event_Participant_Types_Var_Samp_Fields = {
  __typename?: 'event_participant_types_var_samp_fields';
  event_id?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
};

/** aggregate variance on columns */
export type Event_Participant_Types_Variance_Fields = {
  __typename?: 'event_participant_types_variance_fields';
  event_id?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
};

/** columns and relationships of "event_paticipants" */
export type Event_Paticipants = {
  __typename?: 'event_paticipants';
  booking_status: Scalars['event_paticipants_booking_status_enum']['output'];
  created_at: Scalars['timestamp']['output'];
  /** An object relationship */
  event: Events;
  event_id: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  updated_at: Scalars['timestamp']['output'];
  user_id: Scalars['Int']['output'];
};

/** aggregated selection of "event_paticipants" */
export type Event_Paticipants_Aggregate = {
  __typename?: 'event_paticipants_aggregate';
  aggregate?: Maybe<Event_Paticipants_Aggregate_Fields>;
  nodes: Array<Event_Paticipants>;
};

export type Event_Paticipants_Aggregate_Bool_Exp = {
  count?: InputMaybe<Event_Paticipants_Aggregate_Bool_Exp_Count>;
};

export type Event_Paticipants_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Event_Paticipants_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Event_Paticipants_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "event_paticipants" */
export type Event_Paticipants_Aggregate_Fields = {
  __typename?: 'event_paticipants_aggregate_fields';
  avg?: Maybe<Event_Paticipants_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Event_Paticipants_Max_Fields>;
  min?: Maybe<Event_Paticipants_Min_Fields>;
  stddev?: Maybe<Event_Paticipants_Stddev_Fields>;
  stddev_pop?: Maybe<Event_Paticipants_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Event_Paticipants_Stddev_Samp_Fields>;
  sum?: Maybe<Event_Paticipants_Sum_Fields>;
  var_pop?: Maybe<Event_Paticipants_Var_Pop_Fields>;
  var_samp?: Maybe<Event_Paticipants_Var_Samp_Fields>;
  variance?: Maybe<Event_Paticipants_Variance_Fields>;
};


/** aggregate fields of "event_paticipants" */
export type Event_Paticipants_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Event_Paticipants_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "event_paticipants" */
export type Event_Paticipants_Aggregate_Order_By = {
  avg?: InputMaybe<Event_Paticipants_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Event_Paticipants_Max_Order_By>;
  min?: InputMaybe<Event_Paticipants_Min_Order_By>;
  stddev?: InputMaybe<Event_Paticipants_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Event_Paticipants_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Event_Paticipants_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Event_Paticipants_Sum_Order_By>;
  var_pop?: InputMaybe<Event_Paticipants_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Event_Paticipants_Var_Samp_Order_By>;
  variance?: InputMaybe<Event_Paticipants_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "event_paticipants" */
export type Event_Paticipants_Arr_Rel_Insert_Input = {
  data: Array<Event_Paticipants_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Event_Paticipants_On_Conflict>;
};

/** aggregate avg on columns */
export type Event_Paticipants_Avg_Fields = {
  __typename?: 'event_paticipants_avg_fields';
  event_id?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  user_id?: Maybe<Scalars['Float']['output']>;
};

/** order by avg() on columns of table "event_paticipants" */
export type Event_Paticipants_Avg_Order_By = {
  event_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** Boolean expression to compare columns of type "event_paticipants_booking_status_enum". All fields are combined with logical 'AND'. */
export type Event_Paticipants_Booking_Status_Enum_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['event_paticipants_booking_status_enum']['input']>;
  _gt?: InputMaybe<Scalars['event_paticipants_booking_status_enum']['input']>;
  _gte?: InputMaybe<Scalars['event_paticipants_booking_status_enum']['input']>;
  _in?: InputMaybe<Array<Scalars['event_paticipants_booking_status_enum']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['event_paticipants_booking_status_enum']['input']>;
  _lte?: InputMaybe<Scalars['event_paticipants_booking_status_enum']['input']>;
  _neq?: InputMaybe<Scalars['event_paticipants_booking_status_enum']['input']>;
  _nin?: InputMaybe<Array<Scalars['event_paticipants_booking_status_enum']['input']>>;
};

/** Boolean expression to filter rows from the table "event_paticipants". All fields are combined with a logical 'AND'. */
export type Event_Paticipants_Bool_Exp = {
  _and?: InputMaybe<Array<Event_Paticipants_Bool_Exp>>;
  _not?: InputMaybe<Event_Paticipants_Bool_Exp>;
  _or?: InputMaybe<Array<Event_Paticipants_Bool_Exp>>;
  booking_status?: InputMaybe<Event_Paticipants_Booking_Status_Enum_Comparison_Exp>;
  created_at?: InputMaybe<Timestamp_Comparison_Exp>;
  event?: InputMaybe<Events_Bool_Exp>;
  event_id?: InputMaybe<Int_Comparison_Exp>;
  id?: InputMaybe<Int_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamp_Comparison_Exp>;
  user_id?: InputMaybe<Int_Comparison_Exp>;
};

/** unique or primary key constraints on table "event_paticipants" */
export enum Event_Paticipants_Constraint {
  /** unique or primary key constraint on columns "id" */
  PkF9ad75ad1f92474988bba69cb27 = 'PK_f9ad75ad1f92474988bba69cb27'
}

/** input type for incrementing numeric columns in table "event_paticipants" */
export type Event_Paticipants_Inc_Input = {
  event_id?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  user_id?: InputMaybe<Scalars['Int']['input']>;
};

/** input type for inserting data into table "event_paticipants" */
export type Event_Paticipants_Insert_Input = {
  booking_status?: InputMaybe<Scalars['event_paticipants_booking_status_enum']['input']>;
  created_at?: InputMaybe<Scalars['timestamp']['input']>;
  event?: InputMaybe<Events_Obj_Rel_Insert_Input>;
  event_id?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  updated_at?: InputMaybe<Scalars['timestamp']['input']>;
  user_id?: InputMaybe<Scalars['Int']['input']>;
};

/** aggregate max on columns */
export type Event_Paticipants_Max_Fields = {
  __typename?: 'event_paticipants_max_fields';
  booking_status?: Maybe<Scalars['event_paticipants_booking_status_enum']['output']>;
  created_at?: Maybe<Scalars['timestamp']['output']>;
  event_id?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  updated_at?: Maybe<Scalars['timestamp']['output']>;
  user_id?: Maybe<Scalars['Int']['output']>;
};

/** order by max() on columns of table "event_paticipants" */
export type Event_Paticipants_Max_Order_By = {
  booking_status?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  event_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Event_Paticipants_Min_Fields = {
  __typename?: 'event_paticipants_min_fields';
  booking_status?: Maybe<Scalars['event_paticipants_booking_status_enum']['output']>;
  created_at?: Maybe<Scalars['timestamp']['output']>;
  event_id?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  updated_at?: Maybe<Scalars['timestamp']['output']>;
  user_id?: Maybe<Scalars['Int']['output']>;
};

/** order by min() on columns of table "event_paticipants" */
export type Event_Paticipants_Min_Order_By = {
  booking_status?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  event_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "event_paticipants" */
export type Event_Paticipants_Mutation_Response = {
  __typename?: 'event_paticipants_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Event_Paticipants>;
};

/** on_conflict condition type for table "event_paticipants" */
export type Event_Paticipants_On_Conflict = {
  constraint: Event_Paticipants_Constraint;
  update_columns?: Array<Event_Paticipants_Update_Column>;
  where?: InputMaybe<Event_Paticipants_Bool_Exp>;
};

/** Ordering options when selecting data from "event_paticipants". */
export type Event_Paticipants_Order_By = {
  booking_status?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  event?: InputMaybe<Events_Order_By>;
  event_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** primary key columns input for table: event_paticipants */
export type Event_Paticipants_Pk_Columns_Input = {
  id: Scalars['Int']['input'];
};

/** select columns of table "event_paticipants" */
export enum Event_Paticipants_Select_Column {
  /** column name */
  BookingStatus = 'booking_status',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  EventId = 'event_id',
  /** column name */
  Id = 'id',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  UserId = 'user_id'
}

/** input type for updating data in table "event_paticipants" */
export type Event_Paticipants_Set_Input = {
  booking_status?: InputMaybe<Scalars['event_paticipants_booking_status_enum']['input']>;
  created_at?: InputMaybe<Scalars['timestamp']['input']>;
  event_id?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  updated_at?: InputMaybe<Scalars['timestamp']['input']>;
  user_id?: InputMaybe<Scalars['Int']['input']>;
};

/** aggregate stddev on columns */
export type Event_Paticipants_Stddev_Fields = {
  __typename?: 'event_paticipants_stddev_fields';
  event_id?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  user_id?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev() on columns of table "event_paticipants" */
export type Event_Paticipants_Stddev_Order_By = {
  event_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Event_Paticipants_Stddev_Pop_Fields = {
  __typename?: 'event_paticipants_stddev_pop_fields';
  event_id?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  user_id?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_pop() on columns of table "event_paticipants" */
export type Event_Paticipants_Stddev_Pop_Order_By = {
  event_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Event_Paticipants_Stddev_Samp_Fields = {
  __typename?: 'event_paticipants_stddev_samp_fields';
  event_id?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  user_id?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_samp() on columns of table "event_paticipants" */
export type Event_Paticipants_Stddev_Samp_Order_By = {
  event_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** Streaming cursor of the table "event_paticipants" */
export type Event_Paticipants_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Event_Paticipants_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Event_Paticipants_Stream_Cursor_Value_Input = {
  booking_status?: InputMaybe<Scalars['event_paticipants_booking_status_enum']['input']>;
  created_at?: InputMaybe<Scalars['timestamp']['input']>;
  event_id?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  updated_at?: InputMaybe<Scalars['timestamp']['input']>;
  user_id?: InputMaybe<Scalars['Int']['input']>;
};

/** aggregate sum on columns */
export type Event_Paticipants_Sum_Fields = {
  __typename?: 'event_paticipants_sum_fields';
  event_id?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  user_id?: Maybe<Scalars['Int']['output']>;
};

/** order by sum() on columns of table "event_paticipants" */
export type Event_Paticipants_Sum_Order_By = {
  event_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** update columns of table "event_paticipants" */
export enum Event_Paticipants_Update_Column {
  /** column name */
  BookingStatus = 'booking_status',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  EventId = 'event_id',
  /** column name */
  Id = 'id',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  UserId = 'user_id'
}

export type Event_Paticipants_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Event_Paticipants_Inc_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Event_Paticipants_Set_Input>;
  /** filter the rows which have to be updated */
  where: Event_Paticipants_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Event_Paticipants_Var_Pop_Fields = {
  __typename?: 'event_paticipants_var_pop_fields';
  event_id?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  user_id?: Maybe<Scalars['Float']['output']>;
};

/** order by var_pop() on columns of table "event_paticipants" */
export type Event_Paticipants_Var_Pop_Order_By = {
  event_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Event_Paticipants_Var_Samp_Fields = {
  __typename?: 'event_paticipants_var_samp_fields';
  event_id?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  user_id?: Maybe<Scalars['Float']['output']>;
};

/** order by var_samp() on columns of table "event_paticipants" */
export type Event_Paticipants_Var_Samp_Order_By = {
  event_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Event_Paticipants_Variance_Fields = {
  __typename?: 'event_paticipants_variance_fields';
  event_id?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  user_id?: Maybe<Scalars['Float']['output']>;
};

/** order by variance() on columns of table "event_paticipants" */
export type Event_Paticipants_Variance_Order_By = {
  event_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** columns and relationships of "events" */
export type Events = {
  __typename?: 'events';
  address: Scalars['String']['output'];
  avatar: Scalars['String']['output'];
  created_at: Scalars['timestamp']['output'];
  description: Scalars['String']['output'];
  email: Scalars['String']['output'];
  end_date_booking: Scalars['date']['output'];
  end_date_event: Scalars['date']['output'];
  /** An array relationship */
  event_paticipants: Array<Event_Paticipants>;
  /** An aggregate relationship */
  event_paticipants_aggregate: Event_Paticipants_Aggregate;
  id: Scalars['Int']['output'];
  /** An array relationship */
  images: Array<Images>;
  /** An aggregate relationship */
  images_aggregate: Images_Aggregate;
  name: Scalars['String']['output'];
  phone: Scalars['String']['output'];
  priority: Scalars['events_priority_enum']['output'];
  priority_expired?: Maybe<Scalars['date']['output']>;
  start_date_booking: Scalars['date']['output'];
  start_date_event: Scalars['date']['output'];
  temple_id?: Maybe<Scalars['Int']['output']>;
  updated_at: Scalars['timestamp']['output'];
};


/** columns and relationships of "events" */
export type EventsEvent_PaticipantsArgs = {
  distinct_on?: InputMaybe<Array<Event_Paticipants_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Event_Paticipants_Order_By>>;
  where?: InputMaybe<Event_Paticipants_Bool_Exp>;
};


/** columns and relationships of "events" */
export type EventsEvent_Paticipants_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Event_Paticipants_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Event_Paticipants_Order_By>>;
  where?: InputMaybe<Event_Paticipants_Bool_Exp>;
};


/** columns and relationships of "events" */
export type EventsImagesArgs = {
  distinct_on?: InputMaybe<Array<Images_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Images_Order_By>>;
  where?: InputMaybe<Images_Bool_Exp>;
};


/** columns and relationships of "events" */
export type EventsImages_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Images_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Images_Order_By>>;
  where?: InputMaybe<Images_Bool_Exp>;
};

/** aggregated selection of "events" */
export type Events_Aggregate = {
  __typename?: 'events_aggregate';
  aggregate?: Maybe<Events_Aggregate_Fields>;
  nodes: Array<Events>;
};

/** aggregate fields of "events" */
export type Events_Aggregate_Fields = {
  __typename?: 'events_aggregate_fields';
  avg?: Maybe<Events_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Events_Max_Fields>;
  min?: Maybe<Events_Min_Fields>;
  stddev?: Maybe<Events_Stddev_Fields>;
  stddev_pop?: Maybe<Events_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Events_Stddev_Samp_Fields>;
  sum?: Maybe<Events_Sum_Fields>;
  var_pop?: Maybe<Events_Var_Pop_Fields>;
  var_samp?: Maybe<Events_Var_Samp_Fields>;
  variance?: Maybe<Events_Variance_Fields>;
};


/** aggregate fields of "events" */
export type Events_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Events_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** aggregate avg on columns */
export type Events_Avg_Fields = {
  __typename?: 'events_avg_fields';
  id?: Maybe<Scalars['Float']['output']>;
  temple_id?: Maybe<Scalars['Float']['output']>;
};

/** Boolean expression to filter rows from the table "events". All fields are combined with a logical 'AND'. */
export type Events_Bool_Exp = {
  _and?: InputMaybe<Array<Events_Bool_Exp>>;
  _not?: InputMaybe<Events_Bool_Exp>;
  _or?: InputMaybe<Array<Events_Bool_Exp>>;
  address?: InputMaybe<String_Comparison_Exp>;
  avatar?: InputMaybe<String_Comparison_Exp>;
  created_at?: InputMaybe<Timestamp_Comparison_Exp>;
  description?: InputMaybe<String_Comparison_Exp>;
  email?: InputMaybe<String_Comparison_Exp>;
  end_date_booking?: InputMaybe<Date_Comparison_Exp>;
  end_date_event?: InputMaybe<Date_Comparison_Exp>;
  event_paticipants?: InputMaybe<Event_Paticipants_Bool_Exp>;
  event_paticipants_aggregate?: InputMaybe<Event_Paticipants_Aggregate_Bool_Exp>;
  id?: InputMaybe<Int_Comparison_Exp>;
  images?: InputMaybe<Images_Bool_Exp>;
  images_aggregate?: InputMaybe<Images_Aggregate_Bool_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  phone?: InputMaybe<String_Comparison_Exp>;
  priority?: InputMaybe<Events_Priority_Enum_Comparison_Exp>;
  priority_expired?: InputMaybe<Date_Comparison_Exp>;
  start_date_booking?: InputMaybe<Date_Comparison_Exp>;
  start_date_event?: InputMaybe<Date_Comparison_Exp>;
  temple_id?: InputMaybe<Int_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamp_Comparison_Exp>;
};

/** unique or primary key constraints on table "events" */
export enum Events_Constraint {
  /** unique or primary key constraint on columns "id" */
  Pk_40731c7151fe4be3116e45ddf73 = 'PK_40731c7151fe4be3116e45ddf73'
}

/** input type for incrementing numeric columns in table "events" */
export type Events_Inc_Input = {
  id?: InputMaybe<Scalars['Int']['input']>;
  temple_id?: InputMaybe<Scalars['Int']['input']>;
};

/** input type for inserting data into table "events" */
export type Events_Insert_Input = {
  address?: InputMaybe<Scalars['String']['input']>;
  avatar?: InputMaybe<Scalars['String']['input']>;
  created_at?: InputMaybe<Scalars['timestamp']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  end_date_booking?: InputMaybe<Scalars['date']['input']>;
  end_date_event?: InputMaybe<Scalars['date']['input']>;
  event_paticipants?: InputMaybe<Event_Paticipants_Arr_Rel_Insert_Input>;
  id?: InputMaybe<Scalars['Int']['input']>;
  images?: InputMaybe<Images_Arr_Rel_Insert_Input>;
  name?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
  priority?: InputMaybe<Scalars['events_priority_enum']['input']>;
  priority_expired?: InputMaybe<Scalars['date']['input']>;
  start_date_booking?: InputMaybe<Scalars['date']['input']>;
  start_date_event?: InputMaybe<Scalars['date']['input']>;
  temple_id?: InputMaybe<Scalars['Int']['input']>;
  updated_at?: InputMaybe<Scalars['timestamp']['input']>;
};

/** aggregate max on columns */
export type Events_Max_Fields = {
  __typename?: 'events_max_fields';
  address?: Maybe<Scalars['String']['output']>;
  avatar?: Maybe<Scalars['String']['output']>;
  created_at?: Maybe<Scalars['timestamp']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  end_date_booking?: Maybe<Scalars['date']['output']>;
  end_date_event?: Maybe<Scalars['date']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  phone?: Maybe<Scalars['String']['output']>;
  priority?: Maybe<Scalars['events_priority_enum']['output']>;
  priority_expired?: Maybe<Scalars['date']['output']>;
  start_date_booking?: Maybe<Scalars['date']['output']>;
  start_date_event?: Maybe<Scalars['date']['output']>;
  temple_id?: Maybe<Scalars['Int']['output']>;
  updated_at?: Maybe<Scalars['timestamp']['output']>;
};

/** aggregate min on columns */
export type Events_Min_Fields = {
  __typename?: 'events_min_fields';
  address?: Maybe<Scalars['String']['output']>;
  avatar?: Maybe<Scalars['String']['output']>;
  created_at?: Maybe<Scalars['timestamp']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  end_date_booking?: Maybe<Scalars['date']['output']>;
  end_date_event?: Maybe<Scalars['date']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  phone?: Maybe<Scalars['String']['output']>;
  priority?: Maybe<Scalars['events_priority_enum']['output']>;
  priority_expired?: Maybe<Scalars['date']['output']>;
  start_date_booking?: Maybe<Scalars['date']['output']>;
  start_date_event?: Maybe<Scalars['date']['output']>;
  temple_id?: Maybe<Scalars['Int']['output']>;
  updated_at?: Maybe<Scalars['timestamp']['output']>;
};

/** response of any mutation on the table "events" */
export type Events_Mutation_Response = {
  __typename?: 'events_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Events>;
};

/** input type for inserting object relation for remote table "events" */
export type Events_Obj_Rel_Insert_Input = {
  data: Events_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Events_On_Conflict>;
};

/** on_conflict condition type for table "events" */
export type Events_On_Conflict = {
  constraint: Events_Constraint;
  update_columns?: Array<Events_Update_Column>;
  where?: InputMaybe<Events_Bool_Exp>;
};

/** Ordering options when selecting data from "events". */
export type Events_Order_By = {
  address?: InputMaybe<Order_By>;
  avatar?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  description?: InputMaybe<Order_By>;
  email?: InputMaybe<Order_By>;
  end_date_booking?: InputMaybe<Order_By>;
  end_date_event?: InputMaybe<Order_By>;
  event_paticipants_aggregate?: InputMaybe<Event_Paticipants_Aggregate_Order_By>;
  id?: InputMaybe<Order_By>;
  images_aggregate?: InputMaybe<Images_Aggregate_Order_By>;
  name?: InputMaybe<Order_By>;
  phone?: InputMaybe<Order_By>;
  priority?: InputMaybe<Order_By>;
  priority_expired?: InputMaybe<Order_By>;
  start_date_booking?: InputMaybe<Order_By>;
  start_date_event?: InputMaybe<Order_By>;
  temple_id?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** primary key columns input for table: events */
export type Events_Pk_Columns_Input = {
  id: Scalars['Int']['input'];
};

/** Boolean expression to compare columns of type "events_priority_enum". All fields are combined with logical 'AND'. */
export type Events_Priority_Enum_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['events_priority_enum']['input']>;
  _gt?: InputMaybe<Scalars['events_priority_enum']['input']>;
  _gte?: InputMaybe<Scalars['events_priority_enum']['input']>;
  _in?: InputMaybe<Array<Scalars['events_priority_enum']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['events_priority_enum']['input']>;
  _lte?: InputMaybe<Scalars['events_priority_enum']['input']>;
  _neq?: InputMaybe<Scalars['events_priority_enum']['input']>;
  _nin?: InputMaybe<Array<Scalars['events_priority_enum']['input']>>;
};

/** select columns of table "events" */
export enum Events_Select_Column {
  /** column name */
  Address = 'address',
  /** column name */
  Avatar = 'avatar',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Description = 'description',
  /** column name */
  Email = 'email',
  /** column name */
  EndDateBooking = 'end_date_booking',
  /** column name */
  EndDateEvent = 'end_date_event',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  Phone = 'phone',
  /** column name */
  Priority = 'priority',
  /** column name */
  PriorityExpired = 'priority_expired',
  /** column name */
  StartDateBooking = 'start_date_booking',
  /** column name */
  StartDateEvent = 'start_date_event',
  /** column name */
  TempleId = 'temple_id',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** input type for updating data in table "events" */
export type Events_Set_Input = {
  address?: InputMaybe<Scalars['String']['input']>;
  avatar?: InputMaybe<Scalars['String']['input']>;
  created_at?: InputMaybe<Scalars['timestamp']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  end_date_booking?: InputMaybe<Scalars['date']['input']>;
  end_date_event?: InputMaybe<Scalars['date']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
  priority?: InputMaybe<Scalars['events_priority_enum']['input']>;
  priority_expired?: InputMaybe<Scalars['date']['input']>;
  start_date_booking?: InputMaybe<Scalars['date']['input']>;
  start_date_event?: InputMaybe<Scalars['date']['input']>;
  temple_id?: InputMaybe<Scalars['Int']['input']>;
  updated_at?: InputMaybe<Scalars['timestamp']['input']>;
};

/** aggregate stddev on columns */
export type Events_Stddev_Fields = {
  __typename?: 'events_stddev_fields';
  id?: Maybe<Scalars['Float']['output']>;
  temple_id?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_pop on columns */
export type Events_Stddev_Pop_Fields = {
  __typename?: 'events_stddev_pop_fields';
  id?: Maybe<Scalars['Float']['output']>;
  temple_id?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_samp on columns */
export type Events_Stddev_Samp_Fields = {
  __typename?: 'events_stddev_samp_fields';
  id?: Maybe<Scalars['Float']['output']>;
  temple_id?: Maybe<Scalars['Float']['output']>;
};

/** Streaming cursor of the table "events" */
export type Events_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Events_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Events_Stream_Cursor_Value_Input = {
  address?: InputMaybe<Scalars['String']['input']>;
  avatar?: InputMaybe<Scalars['String']['input']>;
  created_at?: InputMaybe<Scalars['timestamp']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  end_date_booking?: InputMaybe<Scalars['date']['input']>;
  end_date_event?: InputMaybe<Scalars['date']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
  priority?: InputMaybe<Scalars['events_priority_enum']['input']>;
  priority_expired?: InputMaybe<Scalars['date']['input']>;
  start_date_booking?: InputMaybe<Scalars['date']['input']>;
  start_date_event?: InputMaybe<Scalars['date']['input']>;
  temple_id?: InputMaybe<Scalars['Int']['input']>;
  updated_at?: InputMaybe<Scalars['timestamp']['input']>;
};

/** aggregate sum on columns */
export type Events_Sum_Fields = {
  __typename?: 'events_sum_fields';
  id?: Maybe<Scalars['Int']['output']>;
  temple_id?: Maybe<Scalars['Int']['output']>;
};

/** update columns of table "events" */
export enum Events_Update_Column {
  /** column name */
  Address = 'address',
  /** column name */
  Avatar = 'avatar',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Description = 'description',
  /** column name */
  Email = 'email',
  /** column name */
  EndDateBooking = 'end_date_booking',
  /** column name */
  EndDateEvent = 'end_date_event',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  Phone = 'phone',
  /** column name */
  Priority = 'priority',
  /** column name */
  PriorityExpired = 'priority_expired',
  /** column name */
  StartDateBooking = 'start_date_booking',
  /** column name */
  StartDateEvent = 'start_date_event',
  /** column name */
  TempleId = 'temple_id',
  /** column name */
  UpdatedAt = 'updated_at'
}

export type Events_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Events_Inc_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Events_Set_Input>;
  /** filter the rows which have to be updated */
  where: Events_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Events_Var_Pop_Fields = {
  __typename?: 'events_var_pop_fields';
  id?: Maybe<Scalars['Float']['output']>;
  temple_id?: Maybe<Scalars['Float']['output']>;
};

/** aggregate var_samp on columns */
export type Events_Var_Samp_Fields = {
  __typename?: 'events_var_samp_fields';
  id?: Maybe<Scalars['Float']['output']>;
  temple_id?: Maybe<Scalars['Float']['output']>;
};

/** aggregate variance on columns */
export type Events_Variance_Fields = {
  __typename?: 'events_variance_fields';
  id?: Maybe<Scalars['Float']['output']>;
  temple_id?: Maybe<Scalars['Float']['output']>;
};

/** columns and relationships of "families" */
export type Families = {
  __typename?: 'families';
  address: Scalars['String']['output'];
  admin_id: Scalars['Int']['output'];
  avatar: Scalars['String']['output'];
  created_at: Scalars['timestamp']['output'];
  /** An array relationship */
  deceaseds: Array<Deceased>;
  /** An aggregate relationship */
  deceaseds_aggregate: Deceased_Aggregate;
  description: Scalars['String']['output'];
  /** An array relationship */
  family_temples: Array<Family_Temples>;
  /** An aggregate relationship */
  family_temples_aggregate: Family_Temples_Aggregate;
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  phone: Scalars['String']['output'];
  status: Scalars['families_status_enum']['output'];
  updated_at: Scalars['timestamp']['output'];
  /** An array relationship */
  users: Array<Users>;
  /** An aggregate relationship */
  users_aggregate: Users_Aggregate;
};


/** columns and relationships of "families" */
export type FamiliesDeceasedsArgs = {
  distinct_on?: InputMaybe<Array<Deceased_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Deceased_Order_By>>;
  where?: InputMaybe<Deceased_Bool_Exp>;
};


/** columns and relationships of "families" */
export type FamiliesDeceaseds_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Deceased_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Deceased_Order_By>>;
  where?: InputMaybe<Deceased_Bool_Exp>;
};


/** columns and relationships of "families" */
export type FamiliesFamily_TemplesArgs = {
  distinct_on?: InputMaybe<Array<Family_Temples_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Family_Temples_Order_By>>;
  where?: InputMaybe<Family_Temples_Bool_Exp>;
};


/** columns and relationships of "families" */
export type FamiliesFamily_Temples_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Family_Temples_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Family_Temples_Order_By>>;
  where?: InputMaybe<Family_Temples_Bool_Exp>;
};


/** columns and relationships of "families" */
export type FamiliesUsersArgs = {
  distinct_on?: InputMaybe<Array<Users_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Users_Order_By>>;
  where?: InputMaybe<Users_Bool_Exp>;
};


/** columns and relationships of "families" */
export type FamiliesUsers_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Users_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Users_Order_By>>;
  where?: InputMaybe<Users_Bool_Exp>;
};

/** aggregated selection of "families" */
export type Families_Aggregate = {
  __typename?: 'families_aggregate';
  aggregate?: Maybe<Families_Aggregate_Fields>;
  nodes: Array<Families>;
};

/** aggregate fields of "families" */
export type Families_Aggregate_Fields = {
  __typename?: 'families_aggregate_fields';
  avg?: Maybe<Families_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Families_Max_Fields>;
  min?: Maybe<Families_Min_Fields>;
  stddev?: Maybe<Families_Stddev_Fields>;
  stddev_pop?: Maybe<Families_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Families_Stddev_Samp_Fields>;
  sum?: Maybe<Families_Sum_Fields>;
  var_pop?: Maybe<Families_Var_Pop_Fields>;
  var_samp?: Maybe<Families_Var_Samp_Fields>;
  variance?: Maybe<Families_Variance_Fields>;
};


/** aggregate fields of "families" */
export type Families_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Families_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** aggregate avg on columns */
export type Families_Avg_Fields = {
  __typename?: 'families_avg_fields';
  admin_id?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
};

/** Boolean expression to filter rows from the table "families". All fields are combined with a logical 'AND'. */
export type Families_Bool_Exp = {
  _and?: InputMaybe<Array<Families_Bool_Exp>>;
  _not?: InputMaybe<Families_Bool_Exp>;
  _or?: InputMaybe<Array<Families_Bool_Exp>>;
  address?: InputMaybe<String_Comparison_Exp>;
  admin_id?: InputMaybe<Int_Comparison_Exp>;
  avatar?: InputMaybe<String_Comparison_Exp>;
  created_at?: InputMaybe<Timestamp_Comparison_Exp>;
  deceaseds?: InputMaybe<Deceased_Bool_Exp>;
  deceaseds_aggregate?: InputMaybe<Deceased_Aggregate_Bool_Exp>;
  description?: InputMaybe<String_Comparison_Exp>;
  family_temples?: InputMaybe<Family_Temples_Bool_Exp>;
  family_temples_aggregate?: InputMaybe<Family_Temples_Aggregate_Bool_Exp>;
  id?: InputMaybe<Int_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  phone?: InputMaybe<String_Comparison_Exp>;
  status?: InputMaybe<Families_Status_Enum_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamp_Comparison_Exp>;
  users?: InputMaybe<Users_Bool_Exp>;
  users_aggregate?: InputMaybe<Users_Aggregate_Bool_Exp>;
};

/** unique or primary key constraints on table "families" */
export enum Families_Constraint {
  /** unique or primary key constraint on columns "id" */
  Pk_70414ac0c8f45664cf71324b9bb = 'PK_70414ac0c8f45664cf71324b9bb'
}

/** input type for incrementing numeric columns in table "families" */
export type Families_Inc_Input = {
  admin_id?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
};

/** input type for inserting data into table "families" */
export type Families_Insert_Input = {
  address?: InputMaybe<Scalars['String']['input']>;
  admin_id?: InputMaybe<Scalars['Int']['input']>;
  avatar?: InputMaybe<Scalars['String']['input']>;
  created_at?: InputMaybe<Scalars['timestamp']['input']>;
  deceaseds?: InputMaybe<Deceased_Arr_Rel_Insert_Input>;
  description?: InputMaybe<Scalars['String']['input']>;
  family_temples?: InputMaybe<Family_Temples_Arr_Rel_Insert_Input>;
  id?: InputMaybe<Scalars['Int']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Scalars['families_status_enum']['input']>;
  updated_at?: InputMaybe<Scalars['timestamp']['input']>;
  users?: InputMaybe<Users_Arr_Rel_Insert_Input>;
};

/** aggregate max on columns */
export type Families_Max_Fields = {
  __typename?: 'families_max_fields';
  address?: Maybe<Scalars['String']['output']>;
  admin_id?: Maybe<Scalars['Int']['output']>;
  avatar?: Maybe<Scalars['String']['output']>;
  created_at?: Maybe<Scalars['timestamp']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  phone?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['families_status_enum']['output']>;
  updated_at?: Maybe<Scalars['timestamp']['output']>;
};

/** aggregate min on columns */
export type Families_Min_Fields = {
  __typename?: 'families_min_fields';
  address?: Maybe<Scalars['String']['output']>;
  admin_id?: Maybe<Scalars['Int']['output']>;
  avatar?: Maybe<Scalars['String']['output']>;
  created_at?: Maybe<Scalars['timestamp']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  phone?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['families_status_enum']['output']>;
  updated_at?: Maybe<Scalars['timestamp']['output']>;
};

/** response of any mutation on the table "families" */
export type Families_Mutation_Response = {
  __typename?: 'families_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Families>;
};

/** input type for inserting object relation for remote table "families" */
export type Families_Obj_Rel_Insert_Input = {
  data: Families_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Families_On_Conflict>;
};

/** on_conflict condition type for table "families" */
export type Families_On_Conflict = {
  constraint: Families_Constraint;
  update_columns?: Array<Families_Update_Column>;
  where?: InputMaybe<Families_Bool_Exp>;
};

/** Ordering options when selecting data from "families". */
export type Families_Order_By = {
  address?: InputMaybe<Order_By>;
  admin_id?: InputMaybe<Order_By>;
  avatar?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  deceaseds_aggregate?: InputMaybe<Deceased_Aggregate_Order_By>;
  description?: InputMaybe<Order_By>;
  family_temples_aggregate?: InputMaybe<Family_Temples_Aggregate_Order_By>;
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  phone?: InputMaybe<Order_By>;
  status?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  users_aggregate?: InputMaybe<Users_Aggregate_Order_By>;
};

/** primary key columns input for table: families */
export type Families_Pk_Columns_Input = {
  id: Scalars['Int']['input'];
};

/** select columns of table "families" */
export enum Families_Select_Column {
  /** column name */
  Address = 'address',
  /** column name */
  AdminId = 'admin_id',
  /** column name */
  Avatar = 'avatar',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Description = 'description',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  Phone = 'phone',
  /** column name */
  Status = 'status',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** input type for updating data in table "families" */
export type Families_Set_Input = {
  address?: InputMaybe<Scalars['String']['input']>;
  admin_id?: InputMaybe<Scalars['Int']['input']>;
  avatar?: InputMaybe<Scalars['String']['input']>;
  created_at?: InputMaybe<Scalars['timestamp']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Scalars['families_status_enum']['input']>;
  updated_at?: InputMaybe<Scalars['timestamp']['input']>;
};

/** Boolean expression to compare columns of type "families_status_enum". All fields are combined with logical 'AND'. */
export type Families_Status_Enum_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['families_status_enum']['input']>;
  _gt?: InputMaybe<Scalars['families_status_enum']['input']>;
  _gte?: InputMaybe<Scalars['families_status_enum']['input']>;
  _in?: InputMaybe<Array<Scalars['families_status_enum']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['families_status_enum']['input']>;
  _lte?: InputMaybe<Scalars['families_status_enum']['input']>;
  _neq?: InputMaybe<Scalars['families_status_enum']['input']>;
  _nin?: InputMaybe<Array<Scalars['families_status_enum']['input']>>;
};

/** aggregate stddev on columns */
export type Families_Stddev_Fields = {
  __typename?: 'families_stddev_fields';
  admin_id?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_pop on columns */
export type Families_Stddev_Pop_Fields = {
  __typename?: 'families_stddev_pop_fields';
  admin_id?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_samp on columns */
export type Families_Stddev_Samp_Fields = {
  __typename?: 'families_stddev_samp_fields';
  admin_id?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
};

/** Streaming cursor of the table "families" */
export type Families_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Families_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Families_Stream_Cursor_Value_Input = {
  address?: InputMaybe<Scalars['String']['input']>;
  admin_id?: InputMaybe<Scalars['Int']['input']>;
  avatar?: InputMaybe<Scalars['String']['input']>;
  created_at?: InputMaybe<Scalars['timestamp']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Scalars['families_status_enum']['input']>;
  updated_at?: InputMaybe<Scalars['timestamp']['input']>;
};

/** aggregate sum on columns */
export type Families_Sum_Fields = {
  __typename?: 'families_sum_fields';
  admin_id?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
};

/** update columns of table "families" */
export enum Families_Update_Column {
  /** column name */
  Address = 'address',
  /** column name */
  AdminId = 'admin_id',
  /** column name */
  Avatar = 'avatar',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Description = 'description',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  Phone = 'phone',
  /** column name */
  Status = 'status',
  /** column name */
  UpdatedAt = 'updated_at'
}

export type Families_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Families_Inc_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Families_Set_Input>;
  /** filter the rows which have to be updated */
  where: Families_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Families_Var_Pop_Fields = {
  __typename?: 'families_var_pop_fields';
  admin_id?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
};

/** aggregate var_samp on columns */
export type Families_Var_Samp_Fields = {
  __typename?: 'families_var_samp_fields';
  admin_id?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
};

/** aggregate variance on columns */
export type Families_Variance_Fields = {
  __typename?: 'families_variance_fields';
  admin_id?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
};

/** columns and relationships of "family_temples" */
export type Family_Temples = {
  __typename?: 'family_temples';
  created_at: Scalars['timestamp']['output'];
  /** An object relationship */
  family?: Maybe<Families>;
  family_id?: Maybe<Scalars['Int']['output']>;
  id: Scalars['Int']['output'];
  /** An object relationship */
  temple?: Maybe<Temples>;
  temple_id?: Maybe<Scalars['Int']['output']>;
  updated_at: Scalars['timestamp']['output'];
};

/** aggregated selection of "family_temples" */
export type Family_Temples_Aggregate = {
  __typename?: 'family_temples_aggregate';
  aggregate?: Maybe<Family_Temples_Aggregate_Fields>;
  nodes: Array<Family_Temples>;
};

export type Family_Temples_Aggregate_Bool_Exp = {
  count?: InputMaybe<Family_Temples_Aggregate_Bool_Exp_Count>;
};

export type Family_Temples_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Family_Temples_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Family_Temples_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "family_temples" */
export type Family_Temples_Aggregate_Fields = {
  __typename?: 'family_temples_aggregate_fields';
  avg?: Maybe<Family_Temples_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Family_Temples_Max_Fields>;
  min?: Maybe<Family_Temples_Min_Fields>;
  stddev?: Maybe<Family_Temples_Stddev_Fields>;
  stddev_pop?: Maybe<Family_Temples_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Family_Temples_Stddev_Samp_Fields>;
  sum?: Maybe<Family_Temples_Sum_Fields>;
  var_pop?: Maybe<Family_Temples_Var_Pop_Fields>;
  var_samp?: Maybe<Family_Temples_Var_Samp_Fields>;
  variance?: Maybe<Family_Temples_Variance_Fields>;
};


/** aggregate fields of "family_temples" */
export type Family_Temples_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Family_Temples_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "family_temples" */
export type Family_Temples_Aggregate_Order_By = {
  avg?: InputMaybe<Family_Temples_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Family_Temples_Max_Order_By>;
  min?: InputMaybe<Family_Temples_Min_Order_By>;
  stddev?: InputMaybe<Family_Temples_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Family_Temples_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Family_Temples_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Family_Temples_Sum_Order_By>;
  var_pop?: InputMaybe<Family_Temples_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Family_Temples_Var_Samp_Order_By>;
  variance?: InputMaybe<Family_Temples_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "family_temples" */
export type Family_Temples_Arr_Rel_Insert_Input = {
  data: Array<Family_Temples_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Family_Temples_On_Conflict>;
};

/** aggregate avg on columns */
export type Family_Temples_Avg_Fields = {
  __typename?: 'family_temples_avg_fields';
  family_id?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  temple_id?: Maybe<Scalars['Float']['output']>;
};

/** order by avg() on columns of table "family_temples" */
export type Family_Temples_Avg_Order_By = {
  family_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  temple_id?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "family_temples". All fields are combined with a logical 'AND'. */
export type Family_Temples_Bool_Exp = {
  _and?: InputMaybe<Array<Family_Temples_Bool_Exp>>;
  _not?: InputMaybe<Family_Temples_Bool_Exp>;
  _or?: InputMaybe<Array<Family_Temples_Bool_Exp>>;
  created_at?: InputMaybe<Timestamp_Comparison_Exp>;
  family?: InputMaybe<Families_Bool_Exp>;
  family_id?: InputMaybe<Int_Comparison_Exp>;
  id?: InputMaybe<Int_Comparison_Exp>;
  temple?: InputMaybe<Temples_Bool_Exp>;
  temple_id?: InputMaybe<Int_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamp_Comparison_Exp>;
};

/** unique or primary key constraints on table "family_temples" */
export enum Family_Temples_Constraint {
  /** unique or primary key constraint on columns "id" */
  Pk_75502cb3590739d17279723704f = 'PK_75502cb3590739d17279723704f'
}

/** input type for incrementing numeric columns in table "family_temples" */
export type Family_Temples_Inc_Input = {
  family_id?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  temple_id?: InputMaybe<Scalars['Int']['input']>;
};

/** input type for inserting data into table "family_temples" */
export type Family_Temples_Insert_Input = {
  created_at?: InputMaybe<Scalars['timestamp']['input']>;
  family?: InputMaybe<Families_Obj_Rel_Insert_Input>;
  family_id?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  temple?: InputMaybe<Temples_Obj_Rel_Insert_Input>;
  temple_id?: InputMaybe<Scalars['Int']['input']>;
  updated_at?: InputMaybe<Scalars['timestamp']['input']>;
};

/** aggregate max on columns */
export type Family_Temples_Max_Fields = {
  __typename?: 'family_temples_max_fields';
  created_at?: Maybe<Scalars['timestamp']['output']>;
  family_id?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  temple_id?: Maybe<Scalars['Int']['output']>;
  updated_at?: Maybe<Scalars['timestamp']['output']>;
};

/** order by max() on columns of table "family_temples" */
export type Family_Temples_Max_Order_By = {
  created_at?: InputMaybe<Order_By>;
  family_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  temple_id?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Family_Temples_Min_Fields = {
  __typename?: 'family_temples_min_fields';
  created_at?: Maybe<Scalars['timestamp']['output']>;
  family_id?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  temple_id?: Maybe<Scalars['Int']['output']>;
  updated_at?: Maybe<Scalars['timestamp']['output']>;
};

/** order by min() on columns of table "family_temples" */
export type Family_Temples_Min_Order_By = {
  created_at?: InputMaybe<Order_By>;
  family_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  temple_id?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "family_temples" */
export type Family_Temples_Mutation_Response = {
  __typename?: 'family_temples_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Family_Temples>;
};

/** on_conflict condition type for table "family_temples" */
export type Family_Temples_On_Conflict = {
  constraint: Family_Temples_Constraint;
  update_columns?: Array<Family_Temples_Update_Column>;
  where?: InputMaybe<Family_Temples_Bool_Exp>;
};

/** Ordering options when selecting data from "family_temples". */
export type Family_Temples_Order_By = {
  created_at?: InputMaybe<Order_By>;
  family?: InputMaybe<Families_Order_By>;
  family_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  temple?: InputMaybe<Temples_Order_By>;
  temple_id?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** primary key columns input for table: family_temples */
export type Family_Temples_Pk_Columns_Input = {
  id: Scalars['Int']['input'];
};

/** select columns of table "family_temples" */
export enum Family_Temples_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  FamilyId = 'family_id',
  /** column name */
  Id = 'id',
  /** column name */
  TempleId = 'temple_id',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** input type for updating data in table "family_temples" */
export type Family_Temples_Set_Input = {
  created_at?: InputMaybe<Scalars['timestamp']['input']>;
  family_id?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  temple_id?: InputMaybe<Scalars['Int']['input']>;
  updated_at?: InputMaybe<Scalars['timestamp']['input']>;
};

/** aggregate stddev on columns */
export type Family_Temples_Stddev_Fields = {
  __typename?: 'family_temples_stddev_fields';
  family_id?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  temple_id?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev() on columns of table "family_temples" */
export type Family_Temples_Stddev_Order_By = {
  family_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  temple_id?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Family_Temples_Stddev_Pop_Fields = {
  __typename?: 'family_temples_stddev_pop_fields';
  family_id?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  temple_id?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_pop() on columns of table "family_temples" */
export type Family_Temples_Stddev_Pop_Order_By = {
  family_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  temple_id?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Family_Temples_Stddev_Samp_Fields = {
  __typename?: 'family_temples_stddev_samp_fields';
  family_id?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  temple_id?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_samp() on columns of table "family_temples" */
export type Family_Temples_Stddev_Samp_Order_By = {
  family_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  temple_id?: InputMaybe<Order_By>;
};

/** Streaming cursor of the table "family_temples" */
export type Family_Temples_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Family_Temples_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Family_Temples_Stream_Cursor_Value_Input = {
  created_at?: InputMaybe<Scalars['timestamp']['input']>;
  family_id?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  temple_id?: InputMaybe<Scalars['Int']['input']>;
  updated_at?: InputMaybe<Scalars['timestamp']['input']>;
};

/** aggregate sum on columns */
export type Family_Temples_Sum_Fields = {
  __typename?: 'family_temples_sum_fields';
  family_id?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  temple_id?: Maybe<Scalars['Int']['output']>;
};

/** order by sum() on columns of table "family_temples" */
export type Family_Temples_Sum_Order_By = {
  family_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  temple_id?: InputMaybe<Order_By>;
};

/** update columns of table "family_temples" */
export enum Family_Temples_Update_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  FamilyId = 'family_id',
  /** column name */
  Id = 'id',
  /** column name */
  TempleId = 'temple_id',
  /** column name */
  UpdatedAt = 'updated_at'
}

export type Family_Temples_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Family_Temples_Inc_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Family_Temples_Set_Input>;
  /** filter the rows which have to be updated */
  where: Family_Temples_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Family_Temples_Var_Pop_Fields = {
  __typename?: 'family_temples_var_pop_fields';
  family_id?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  temple_id?: Maybe<Scalars['Float']['output']>;
};

/** order by var_pop() on columns of table "family_temples" */
export type Family_Temples_Var_Pop_Order_By = {
  family_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  temple_id?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Family_Temples_Var_Samp_Fields = {
  __typename?: 'family_temples_var_samp_fields';
  family_id?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  temple_id?: Maybe<Scalars['Float']['output']>;
};

/** order by var_samp() on columns of table "family_temples" */
export type Family_Temples_Var_Samp_Order_By = {
  family_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  temple_id?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Family_Temples_Variance_Fields = {
  __typename?: 'family_temples_variance_fields';
  family_id?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  temple_id?: Maybe<Scalars['Float']['output']>;
};

/** order by variance() on columns of table "family_temples" */
export type Family_Temples_Variance_Order_By = {
  family_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  temple_id?: InputMaybe<Order_By>;
};

/** columns and relationships of "images" */
export type Images = {
  __typename?: 'images';
  created_at: Scalars['timestamp']['output'];
  /** An object relationship */
  deceased?: Maybe<Deceased>;
  deceased_id?: Maybe<Scalars['Int']['output']>;
  /** An object relationship */
  event?: Maybe<Events>;
  event_id?: Maybe<Scalars['Int']['output']>;
  id: Scalars['Int']['output'];
  image: Scalars['String']['output'];
  /** An object relationship */
  temple?: Maybe<Temples>;
  temple_id?: Maybe<Scalars['Int']['output']>;
  updated_at: Scalars['timestamp']['output'];
};

/** aggregated selection of "images" */
export type Images_Aggregate = {
  __typename?: 'images_aggregate';
  aggregate?: Maybe<Images_Aggregate_Fields>;
  nodes: Array<Images>;
};

export type Images_Aggregate_Bool_Exp = {
  count?: InputMaybe<Images_Aggregate_Bool_Exp_Count>;
};

export type Images_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Images_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Images_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "images" */
export type Images_Aggregate_Fields = {
  __typename?: 'images_aggregate_fields';
  avg?: Maybe<Images_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Images_Max_Fields>;
  min?: Maybe<Images_Min_Fields>;
  stddev?: Maybe<Images_Stddev_Fields>;
  stddev_pop?: Maybe<Images_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Images_Stddev_Samp_Fields>;
  sum?: Maybe<Images_Sum_Fields>;
  var_pop?: Maybe<Images_Var_Pop_Fields>;
  var_samp?: Maybe<Images_Var_Samp_Fields>;
  variance?: Maybe<Images_Variance_Fields>;
};


/** aggregate fields of "images" */
export type Images_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Images_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "images" */
export type Images_Aggregate_Order_By = {
  avg?: InputMaybe<Images_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Images_Max_Order_By>;
  min?: InputMaybe<Images_Min_Order_By>;
  stddev?: InputMaybe<Images_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Images_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Images_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Images_Sum_Order_By>;
  var_pop?: InputMaybe<Images_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Images_Var_Samp_Order_By>;
  variance?: InputMaybe<Images_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "images" */
export type Images_Arr_Rel_Insert_Input = {
  data: Array<Images_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Images_On_Conflict>;
};

/** aggregate avg on columns */
export type Images_Avg_Fields = {
  __typename?: 'images_avg_fields';
  deceased_id?: Maybe<Scalars['Float']['output']>;
  event_id?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  temple_id?: Maybe<Scalars['Float']['output']>;
};

/** order by avg() on columns of table "images" */
export type Images_Avg_Order_By = {
  deceased_id?: InputMaybe<Order_By>;
  event_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  temple_id?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "images". All fields are combined with a logical 'AND'. */
export type Images_Bool_Exp = {
  _and?: InputMaybe<Array<Images_Bool_Exp>>;
  _not?: InputMaybe<Images_Bool_Exp>;
  _or?: InputMaybe<Array<Images_Bool_Exp>>;
  created_at?: InputMaybe<Timestamp_Comparison_Exp>;
  deceased?: InputMaybe<Deceased_Bool_Exp>;
  deceased_id?: InputMaybe<Int_Comparison_Exp>;
  event?: InputMaybe<Events_Bool_Exp>;
  event_id?: InputMaybe<Int_Comparison_Exp>;
  id?: InputMaybe<Int_Comparison_Exp>;
  image?: InputMaybe<String_Comparison_Exp>;
  temple?: InputMaybe<Temples_Bool_Exp>;
  temple_id?: InputMaybe<Int_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamp_Comparison_Exp>;
};

/** unique or primary key constraints on table "images" */
export enum Images_Constraint {
  /** unique or primary key constraint on columns "id" */
  Pk_1fe148074c6a1a91b63cb9ee3c9 = 'PK_1fe148074c6a1a91b63cb9ee3c9'
}

/** input type for incrementing numeric columns in table "images" */
export type Images_Inc_Input = {
  deceased_id?: InputMaybe<Scalars['Int']['input']>;
  event_id?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  temple_id?: InputMaybe<Scalars['Int']['input']>;
};

/** input type for inserting data into table "images" */
export type Images_Insert_Input = {
  created_at?: InputMaybe<Scalars['timestamp']['input']>;
  deceased?: InputMaybe<Deceased_Obj_Rel_Insert_Input>;
  deceased_id?: InputMaybe<Scalars['Int']['input']>;
  event?: InputMaybe<Events_Obj_Rel_Insert_Input>;
  event_id?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  image?: InputMaybe<Scalars['String']['input']>;
  temple?: InputMaybe<Temples_Obj_Rel_Insert_Input>;
  temple_id?: InputMaybe<Scalars['Int']['input']>;
  updated_at?: InputMaybe<Scalars['timestamp']['input']>;
};

/** aggregate max on columns */
export type Images_Max_Fields = {
  __typename?: 'images_max_fields';
  created_at?: Maybe<Scalars['timestamp']['output']>;
  deceased_id?: Maybe<Scalars['Int']['output']>;
  event_id?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  image?: Maybe<Scalars['String']['output']>;
  temple_id?: Maybe<Scalars['Int']['output']>;
  updated_at?: Maybe<Scalars['timestamp']['output']>;
};

/** order by max() on columns of table "images" */
export type Images_Max_Order_By = {
  created_at?: InputMaybe<Order_By>;
  deceased_id?: InputMaybe<Order_By>;
  event_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  image?: InputMaybe<Order_By>;
  temple_id?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Images_Min_Fields = {
  __typename?: 'images_min_fields';
  created_at?: Maybe<Scalars['timestamp']['output']>;
  deceased_id?: Maybe<Scalars['Int']['output']>;
  event_id?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  image?: Maybe<Scalars['String']['output']>;
  temple_id?: Maybe<Scalars['Int']['output']>;
  updated_at?: Maybe<Scalars['timestamp']['output']>;
};

/** order by min() on columns of table "images" */
export type Images_Min_Order_By = {
  created_at?: InputMaybe<Order_By>;
  deceased_id?: InputMaybe<Order_By>;
  event_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  image?: InputMaybe<Order_By>;
  temple_id?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "images" */
export type Images_Mutation_Response = {
  __typename?: 'images_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Images>;
};

/** on_conflict condition type for table "images" */
export type Images_On_Conflict = {
  constraint: Images_Constraint;
  update_columns?: Array<Images_Update_Column>;
  where?: InputMaybe<Images_Bool_Exp>;
};

/** Ordering options when selecting data from "images". */
export type Images_Order_By = {
  created_at?: InputMaybe<Order_By>;
  deceased?: InputMaybe<Deceased_Order_By>;
  deceased_id?: InputMaybe<Order_By>;
  event?: InputMaybe<Events_Order_By>;
  event_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  image?: InputMaybe<Order_By>;
  temple?: InputMaybe<Temples_Order_By>;
  temple_id?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** primary key columns input for table: images */
export type Images_Pk_Columns_Input = {
  id: Scalars['Int']['input'];
};

/** select columns of table "images" */
export enum Images_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  DeceasedId = 'deceased_id',
  /** column name */
  EventId = 'event_id',
  /** column name */
  Id = 'id',
  /** column name */
  Image = 'image',
  /** column name */
  TempleId = 'temple_id',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** input type for updating data in table "images" */
export type Images_Set_Input = {
  created_at?: InputMaybe<Scalars['timestamp']['input']>;
  deceased_id?: InputMaybe<Scalars['Int']['input']>;
  event_id?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  image?: InputMaybe<Scalars['String']['input']>;
  temple_id?: InputMaybe<Scalars['Int']['input']>;
  updated_at?: InputMaybe<Scalars['timestamp']['input']>;
};

/** aggregate stddev on columns */
export type Images_Stddev_Fields = {
  __typename?: 'images_stddev_fields';
  deceased_id?: Maybe<Scalars['Float']['output']>;
  event_id?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  temple_id?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev() on columns of table "images" */
export type Images_Stddev_Order_By = {
  deceased_id?: InputMaybe<Order_By>;
  event_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  temple_id?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Images_Stddev_Pop_Fields = {
  __typename?: 'images_stddev_pop_fields';
  deceased_id?: Maybe<Scalars['Float']['output']>;
  event_id?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  temple_id?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_pop() on columns of table "images" */
export type Images_Stddev_Pop_Order_By = {
  deceased_id?: InputMaybe<Order_By>;
  event_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  temple_id?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Images_Stddev_Samp_Fields = {
  __typename?: 'images_stddev_samp_fields';
  deceased_id?: Maybe<Scalars['Float']['output']>;
  event_id?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  temple_id?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_samp() on columns of table "images" */
export type Images_Stddev_Samp_Order_By = {
  deceased_id?: InputMaybe<Order_By>;
  event_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  temple_id?: InputMaybe<Order_By>;
};

/** Streaming cursor of the table "images" */
export type Images_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Images_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Images_Stream_Cursor_Value_Input = {
  created_at?: InputMaybe<Scalars['timestamp']['input']>;
  deceased_id?: InputMaybe<Scalars['Int']['input']>;
  event_id?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  image?: InputMaybe<Scalars['String']['input']>;
  temple_id?: InputMaybe<Scalars['Int']['input']>;
  updated_at?: InputMaybe<Scalars['timestamp']['input']>;
};

/** aggregate sum on columns */
export type Images_Sum_Fields = {
  __typename?: 'images_sum_fields';
  deceased_id?: Maybe<Scalars['Int']['output']>;
  event_id?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  temple_id?: Maybe<Scalars['Int']['output']>;
};

/** order by sum() on columns of table "images" */
export type Images_Sum_Order_By = {
  deceased_id?: InputMaybe<Order_By>;
  event_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  temple_id?: InputMaybe<Order_By>;
};

/** update columns of table "images" */
export enum Images_Update_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  DeceasedId = 'deceased_id',
  /** column name */
  EventId = 'event_id',
  /** column name */
  Id = 'id',
  /** column name */
  Image = 'image',
  /** column name */
  TempleId = 'temple_id',
  /** column name */
  UpdatedAt = 'updated_at'
}

export type Images_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Images_Inc_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Images_Set_Input>;
  /** filter the rows which have to be updated */
  where: Images_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Images_Var_Pop_Fields = {
  __typename?: 'images_var_pop_fields';
  deceased_id?: Maybe<Scalars['Float']['output']>;
  event_id?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  temple_id?: Maybe<Scalars['Float']['output']>;
};

/** order by var_pop() on columns of table "images" */
export type Images_Var_Pop_Order_By = {
  deceased_id?: InputMaybe<Order_By>;
  event_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  temple_id?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Images_Var_Samp_Fields = {
  __typename?: 'images_var_samp_fields';
  deceased_id?: Maybe<Scalars['Float']['output']>;
  event_id?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  temple_id?: Maybe<Scalars['Float']['output']>;
};

/** order by var_samp() on columns of table "images" */
export type Images_Var_Samp_Order_By = {
  deceased_id?: InputMaybe<Order_By>;
  event_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  temple_id?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Images_Variance_Fields = {
  __typename?: 'images_variance_fields';
  deceased_id?: Maybe<Scalars['Float']['output']>;
  event_id?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  temple_id?: Maybe<Scalars['Float']['output']>;
};

/** order by variance() on columns of table "images" */
export type Images_Variance_Order_By = {
  deceased_id?: InputMaybe<Order_By>;
  event_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  temple_id?: InputMaybe<Order_By>;
};

/** mutation root */
export type Mutation_Root = {
  __typename?: 'mutation_root';
  /** delete data from the table: "deceased" */
  delete_deceased?: Maybe<Deceased_Mutation_Response>;
  /** delete single row from the table: "deceased" */
  delete_deceased_by_pk?: Maybe<Deceased>;
  /** delete data from the table: "event_participant_types" */
  delete_event_participant_types?: Maybe<Event_Participant_Types_Mutation_Response>;
  /** delete single row from the table: "event_participant_types" */
  delete_event_participant_types_by_pk?: Maybe<Event_Participant_Types>;
  /** delete data from the table: "event_paticipants" */
  delete_event_paticipants?: Maybe<Event_Paticipants_Mutation_Response>;
  /** delete single row from the table: "event_paticipants" */
  delete_event_paticipants_by_pk?: Maybe<Event_Paticipants>;
  /** delete data from the table: "events" */
  delete_events?: Maybe<Events_Mutation_Response>;
  /** delete single row from the table: "events" */
  delete_events_by_pk?: Maybe<Events>;
  /** delete data from the table: "families" */
  delete_families?: Maybe<Families_Mutation_Response>;
  /** delete single row from the table: "families" */
  delete_families_by_pk?: Maybe<Families>;
  /** delete data from the table: "family_temples" */
  delete_family_temples?: Maybe<Family_Temples_Mutation_Response>;
  /** delete single row from the table: "family_temples" */
  delete_family_temples_by_pk?: Maybe<Family_Temples>;
  /** delete data from the table: "images" */
  delete_images?: Maybe<Images_Mutation_Response>;
  /** delete single row from the table: "images" */
  delete_images_by_pk?: Maybe<Images>;
  /** delete data from the table: "reviews" */
  delete_reviews?: Maybe<Reviews_Mutation_Response>;
  /** delete single row from the table: "reviews" */
  delete_reviews_by_pk?: Maybe<Reviews>;
  /** delete data from the table: "temples" */
  delete_temples?: Maybe<Temples_Mutation_Response>;
  /** delete single row from the table: "temples" */
  delete_temples_by_pk?: Maybe<Temples>;
  /** delete data from the table: "user_details" */
  delete_user_details?: Maybe<User_Details_Mutation_Response>;
  /** delete single row from the table: "user_details" */
  delete_user_details_by_pk?: Maybe<User_Details>;
  /** delete data from the table: "users" */
  delete_users?: Maybe<Users_Mutation_Response>;
  /** delete single row from the table: "users" */
  delete_users_by_pk?: Maybe<Users>;
  /** insert data into the table: "deceased" */
  insert_deceased?: Maybe<Deceased_Mutation_Response>;
  /** insert a single row into the table: "deceased" */
  insert_deceased_one?: Maybe<Deceased>;
  /** insert data into the table: "event_participant_types" */
  insert_event_participant_types?: Maybe<Event_Participant_Types_Mutation_Response>;
  /** insert a single row into the table: "event_participant_types" */
  insert_event_participant_types_one?: Maybe<Event_Participant_Types>;
  /** insert data into the table: "event_paticipants" */
  insert_event_paticipants?: Maybe<Event_Paticipants_Mutation_Response>;
  /** insert a single row into the table: "event_paticipants" */
  insert_event_paticipants_one?: Maybe<Event_Paticipants>;
  /** insert data into the table: "events" */
  insert_events?: Maybe<Events_Mutation_Response>;
  /** insert a single row into the table: "events" */
  insert_events_one?: Maybe<Events>;
  /** insert data into the table: "families" */
  insert_families?: Maybe<Families_Mutation_Response>;
  /** insert a single row into the table: "families" */
  insert_families_one?: Maybe<Families>;
  /** insert data into the table: "family_temples" */
  insert_family_temples?: Maybe<Family_Temples_Mutation_Response>;
  /** insert a single row into the table: "family_temples" */
  insert_family_temples_one?: Maybe<Family_Temples>;
  /** insert data into the table: "images" */
  insert_images?: Maybe<Images_Mutation_Response>;
  /** insert a single row into the table: "images" */
  insert_images_one?: Maybe<Images>;
  /** insert data into the table: "reviews" */
  insert_reviews?: Maybe<Reviews_Mutation_Response>;
  /** insert a single row into the table: "reviews" */
  insert_reviews_one?: Maybe<Reviews>;
  /** insert data into the table: "temples" */
  insert_temples?: Maybe<Temples_Mutation_Response>;
  /** insert a single row into the table: "temples" */
  insert_temples_one?: Maybe<Temples>;
  /** insert data into the table: "user_details" */
  insert_user_details?: Maybe<User_Details_Mutation_Response>;
  /** insert a single row into the table: "user_details" */
  insert_user_details_one?: Maybe<User_Details>;
  /** insert data into the table: "users" */
  insert_users?: Maybe<Users_Mutation_Response>;
  /** insert a single row into the table: "users" */
  insert_users_one?: Maybe<Users>;
  refreshToken?: Maybe<RefreshTokenOutput>;
  /** update data of the table: "deceased" */
  update_deceased?: Maybe<Deceased_Mutation_Response>;
  /** update single row of the table: "deceased" */
  update_deceased_by_pk?: Maybe<Deceased>;
  /** update multiples rows of table: "deceased" */
  update_deceased_many?: Maybe<Array<Maybe<Deceased_Mutation_Response>>>;
  /** update data of the table: "event_participant_types" */
  update_event_participant_types?: Maybe<Event_Participant_Types_Mutation_Response>;
  /** update single row of the table: "event_participant_types" */
  update_event_participant_types_by_pk?: Maybe<Event_Participant_Types>;
  /** update multiples rows of table: "event_participant_types" */
  update_event_participant_types_many?: Maybe<Array<Maybe<Event_Participant_Types_Mutation_Response>>>;
  /** update data of the table: "event_paticipants" */
  update_event_paticipants?: Maybe<Event_Paticipants_Mutation_Response>;
  /** update single row of the table: "event_paticipants" */
  update_event_paticipants_by_pk?: Maybe<Event_Paticipants>;
  /** update multiples rows of table: "event_paticipants" */
  update_event_paticipants_many?: Maybe<Array<Maybe<Event_Paticipants_Mutation_Response>>>;
  /** update data of the table: "events" */
  update_events?: Maybe<Events_Mutation_Response>;
  /** update single row of the table: "events" */
  update_events_by_pk?: Maybe<Events>;
  /** update multiples rows of table: "events" */
  update_events_many?: Maybe<Array<Maybe<Events_Mutation_Response>>>;
  /** update data of the table: "families" */
  update_families?: Maybe<Families_Mutation_Response>;
  /** update single row of the table: "families" */
  update_families_by_pk?: Maybe<Families>;
  /** update multiples rows of table: "families" */
  update_families_many?: Maybe<Array<Maybe<Families_Mutation_Response>>>;
  /** update data of the table: "family_temples" */
  update_family_temples?: Maybe<Family_Temples_Mutation_Response>;
  /** update single row of the table: "family_temples" */
  update_family_temples_by_pk?: Maybe<Family_Temples>;
  /** update multiples rows of table: "family_temples" */
  update_family_temples_many?: Maybe<Array<Maybe<Family_Temples_Mutation_Response>>>;
  /** update data of the table: "images" */
  update_images?: Maybe<Images_Mutation_Response>;
  /** update single row of the table: "images" */
  update_images_by_pk?: Maybe<Images>;
  /** update multiples rows of table: "images" */
  update_images_many?: Maybe<Array<Maybe<Images_Mutation_Response>>>;
  /** update data of the table: "reviews" */
  update_reviews?: Maybe<Reviews_Mutation_Response>;
  /** update single row of the table: "reviews" */
  update_reviews_by_pk?: Maybe<Reviews>;
  /** update multiples rows of table: "reviews" */
  update_reviews_many?: Maybe<Array<Maybe<Reviews_Mutation_Response>>>;
  /** update data of the table: "temples" */
  update_temples?: Maybe<Temples_Mutation_Response>;
  /** update single row of the table: "temples" */
  update_temples_by_pk?: Maybe<Temples>;
  /** update multiples rows of table: "temples" */
  update_temples_many?: Maybe<Array<Maybe<Temples_Mutation_Response>>>;
  /** update data of the table: "user_details" */
  update_user_details?: Maybe<User_Details_Mutation_Response>;
  /** update single row of the table: "user_details" */
  update_user_details_by_pk?: Maybe<User_Details>;
  /** update multiples rows of table: "user_details" */
  update_user_details_many?: Maybe<Array<Maybe<User_Details_Mutation_Response>>>;
  /** update data of the table: "users" */
  update_users?: Maybe<Users_Mutation_Response>;
  /** update single row of the table: "users" */
  update_users_by_pk?: Maybe<Users>;
  /** update multiples rows of table: "users" */
  update_users_many?: Maybe<Array<Maybe<Users_Mutation_Response>>>;
  userLogin?: Maybe<UserLoginOutput>;
  userRegister?: Maybe<UserRegisterOutput>;
};


/** mutation root */
export type Mutation_RootDelete_DeceasedArgs = {
  where: Deceased_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Deceased_By_PkArgs = {
  id: Scalars['Int']['input'];
};


/** mutation root */
export type Mutation_RootDelete_Event_Participant_TypesArgs = {
  where: Event_Participant_Types_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Event_Participant_Types_By_PkArgs = {
  id: Scalars['Int']['input'];
};


/** mutation root */
export type Mutation_RootDelete_Event_PaticipantsArgs = {
  where: Event_Paticipants_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Event_Paticipants_By_PkArgs = {
  id: Scalars['Int']['input'];
};


/** mutation root */
export type Mutation_RootDelete_EventsArgs = {
  where: Events_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Events_By_PkArgs = {
  id: Scalars['Int']['input'];
};


/** mutation root */
export type Mutation_RootDelete_FamiliesArgs = {
  where: Families_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Families_By_PkArgs = {
  id: Scalars['Int']['input'];
};


/** mutation root */
export type Mutation_RootDelete_Family_TemplesArgs = {
  where: Family_Temples_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Family_Temples_By_PkArgs = {
  id: Scalars['Int']['input'];
};


/** mutation root */
export type Mutation_RootDelete_ImagesArgs = {
  where: Images_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Images_By_PkArgs = {
  id: Scalars['Int']['input'];
};


/** mutation root */
export type Mutation_RootDelete_ReviewsArgs = {
  where: Reviews_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Reviews_By_PkArgs = {
  id: Scalars['Int']['input'];
};


/** mutation root */
export type Mutation_RootDelete_TemplesArgs = {
  where: Temples_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Temples_By_PkArgs = {
  id: Scalars['Int']['input'];
};


/** mutation root */
export type Mutation_RootDelete_User_DetailsArgs = {
  where: User_Details_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_User_Details_By_PkArgs = {
  id: Scalars['Int']['input'];
};


/** mutation root */
export type Mutation_RootDelete_UsersArgs = {
  where: Users_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Users_By_PkArgs = {
  id: Scalars['Int']['input'];
};


/** mutation root */
export type Mutation_RootInsert_DeceasedArgs = {
  objects: Array<Deceased_Insert_Input>;
  on_conflict?: InputMaybe<Deceased_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Deceased_OneArgs = {
  object: Deceased_Insert_Input;
  on_conflict?: InputMaybe<Deceased_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Event_Participant_TypesArgs = {
  objects: Array<Event_Participant_Types_Insert_Input>;
  on_conflict?: InputMaybe<Event_Participant_Types_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Event_Participant_Types_OneArgs = {
  object: Event_Participant_Types_Insert_Input;
  on_conflict?: InputMaybe<Event_Participant_Types_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Event_PaticipantsArgs = {
  objects: Array<Event_Paticipants_Insert_Input>;
  on_conflict?: InputMaybe<Event_Paticipants_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Event_Paticipants_OneArgs = {
  object: Event_Paticipants_Insert_Input;
  on_conflict?: InputMaybe<Event_Paticipants_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_EventsArgs = {
  objects: Array<Events_Insert_Input>;
  on_conflict?: InputMaybe<Events_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Events_OneArgs = {
  object: Events_Insert_Input;
  on_conflict?: InputMaybe<Events_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_FamiliesArgs = {
  objects: Array<Families_Insert_Input>;
  on_conflict?: InputMaybe<Families_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Families_OneArgs = {
  object: Families_Insert_Input;
  on_conflict?: InputMaybe<Families_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Family_TemplesArgs = {
  objects: Array<Family_Temples_Insert_Input>;
  on_conflict?: InputMaybe<Family_Temples_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Family_Temples_OneArgs = {
  object: Family_Temples_Insert_Input;
  on_conflict?: InputMaybe<Family_Temples_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_ImagesArgs = {
  objects: Array<Images_Insert_Input>;
  on_conflict?: InputMaybe<Images_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Images_OneArgs = {
  object: Images_Insert_Input;
  on_conflict?: InputMaybe<Images_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_ReviewsArgs = {
  objects: Array<Reviews_Insert_Input>;
  on_conflict?: InputMaybe<Reviews_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Reviews_OneArgs = {
  object: Reviews_Insert_Input;
  on_conflict?: InputMaybe<Reviews_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_TemplesArgs = {
  objects: Array<Temples_Insert_Input>;
  on_conflict?: InputMaybe<Temples_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Temples_OneArgs = {
  object: Temples_Insert_Input;
  on_conflict?: InputMaybe<Temples_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_User_DetailsArgs = {
  objects: Array<User_Details_Insert_Input>;
  on_conflict?: InputMaybe<User_Details_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_User_Details_OneArgs = {
  object: User_Details_Insert_Input;
  on_conflict?: InputMaybe<User_Details_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_UsersArgs = {
  objects: Array<Users_Insert_Input>;
  on_conflict?: InputMaybe<Users_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Users_OneArgs = {
  object: Users_Insert_Input;
  on_conflict?: InputMaybe<Users_On_Conflict>;
};


/** mutation root */
export type Mutation_RootRefreshTokenArgs = {
  input: RefreshTokenInput;
};


/** mutation root */
export type Mutation_RootUpdate_DeceasedArgs = {
  _inc?: InputMaybe<Deceased_Inc_Input>;
  _set?: InputMaybe<Deceased_Set_Input>;
  where: Deceased_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Deceased_By_PkArgs = {
  _inc?: InputMaybe<Deceased_Inc_Input>;
  _set?: InputMaybe<Deceased_Set_Input>;
  pk_columns: Deceased_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Deceased_ManyArgs = {
  updates: Array<Deceased_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_Event_Participant_TypesArgs = {
  _inc?: InputMaybe<Event_Participant_Types_Inc_Input>;
  _set?: InputMaybe<Event_Participant_Types_Set_Input>;
  where: Event_Participant_Types_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Event_Participant_Types_By_PkArgs = {
  _inc?: InputMaybe<Event_Participant_Types_Inc_Input>;
  _set?: InputMaybe<Event_Participant_Types_Set_Input>;
  pk_columns: Event_Participant_Types_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Event_Participant_Types_ManyArgs = {
  updates: Array<Event_Participant_Types_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_Event_PaticipantsArgs = {
  _inc?: InputMaybe<Event_Paticipants_Inc_Input>;
  _set?: InputMaybe<Event_Paticipants_Set_Input>;
  where: Event_Paticipants_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Event_Paticipants_By_PkArgs = {
  _inc?: InputMaybe<Event_Paticipants_Inc_Input>;
  _set?: InputMaybe<Event_Paticipants_Set_Input>;
  pk_columns: Event_Paticipants_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Event_Paticipants_ManyArgs = {
  updates: Array<Event_Paticipants_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_EventsArgs = {
  _inc?: InputMaybe<Events_Inc_Input>;
  _set?: InputMaybe<Events_Set_Input>;
  where: Events_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Events_By_PkArgs = {
  _inc?: InputMaybe<Events_Inc_Input>;
  _set?: InputMaybe<Events_Set_Input>;
  pk_columns: Events_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Events_ManyArgs = {
  updates: Array<Events_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_FamiliesArgs = {
  _inc?: InputMaybe<Families_Inc_Input>;
  _set?: InputMaybe<Families_Set_Input>;
  where: Families_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Families_By_PkArgs = {
  _inc?: InputMaybe<Families_Inc_Input>;
  _set?: InputMaybe<Families_Set_Input>;
  pk_columns: Families_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Families_ManyArgs = {
  updates: Array<Families_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_Family_TemplesArgs = {
  _inc?: InputMaybe<Family_Temples_Inc_Input>;
  _set?: InputMaybe<Family_Temples_Set_Input>;
  where: Family_Temples_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Family_Temples_By_PkArgs = {
  _inc?: InputMaybe<Family_Temples_Inc_Input>;
  _set?: InputMaybe<Family_Temples_Set_Input>;
  pk_columns: Family_Temples_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Family_Temples_ManyArgs = {
  updates: Array<Family_Temples_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_ImagesArgs = {
  _inc?: InputMaybe<Images_Inc_Input>;
  _set?: InputMaybe<Images_Set_Input>;
  where: Images_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Images_By_PkArgs = {
  _inc?: InputMaybe<Images_Inc_Input>;
  _set?: InputMaybe<Images_Set_Input>;
  pk_columns: Images_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Images_ManyArgs = {
  updates: Array<Images_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_ReviewsArgs = {
  _inc?: InputMaybe<Reviews_Inc_Input>;
  _set?: InputMaybe<Reviews_Set_Input>;
  where: Reviews_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Reviews_By_PkArgs = {
  _inc?: InputMaybe<Reviews_Inc_Input>;
  _set?: InputMaybe<Reviews_Set_Input>;
  pk_columns: Reviews_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Reviews_ManyArgs = {
  updates: Array<Reviews_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_TemplesArgs = {
  _inc?: InputMaybe<Temples_Inc_Input>;
  _set?: InputMaybe<Temples_Set_Input>;
  where: Temples_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Temples_By_PkArgs = {
  _inc?: InputMaybe<Temples_Inc_Input>;
  _set?: InputMaybe<Temples_Set_Input>;
  pk_columns: Temples_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Temples_ManyArgs = {
  updates: Array<Temples_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_User_DetailsArgs = {
  _inc?: InputMaybe<User_Details_Inc_Input>;
  _set?: InputMaybe<User_Details_Set_Input>;
  where: User_Details_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_User_Details_By_PkArgs = {
  _inc?: InputMaybe<User_Details_Inc_Input>;
  _set?: InputMaybe<User_Details_Set_Input>;
  pk_columns: User_Details_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_User_Details_ManyArgs = {
  updates: Array<User_Details_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_UsersArgs = {
  _inc?: InputMaybe<Users_Inc_Input>;
  _set?: InputMaybe<Users_Set_Input>;
  where: Users_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Users_By_PkArgs = {
  _inc?: InputMaybe<Users_Inc_Input>;
  _set?: InputMaybe<Users_Set_Input>;
  pk_columns: Users_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Users_ManyArgs = {
  updates: Array<Users_Updates>;
};


/** mutation root */
export type Mutation_RootUserLoginArgs = {
  input: UserLoginInput;
};


/** mutation root */
export type Mutation_RootUserRegisterArgs = {
  input: UserRegisterInput;
};

/** column ordering options */
export enum Order_By {
  /** in ascending order, nulls last */
  Asc = 'asc',
  /** in ascending order, nulls first */
  AscNullsFirst = 'asc_nulls_first',
  /** in ascending order, nulls last */
  AscNullsLast = 'asc_nulls_last',
  /** in descending order, nulls first */
  Desc = 'desc',
  /** in descending order, nulls first */
  DescNullsFirst = 'desc_nulls_first',
  /** in descending order, nulls last */
  DescNullsLast = 'desc_nulls_last'
}

export type Query_Root = {
  __typename?: 'query_root';
  /** fetch data from the table: "deceased" */
  deceased: Array<Deceased>;
  /** fetch aggregated fields from the table: "deceased" */
  deceased_aggregate: Deceased_Aggregate;
  /** fetch data from the table: "deceased" using primary key columns */
  deceased_by_pk?: Maybe<Deceased>;
  /** fetch data from the table: "event_participant_types" */
  event_participant_types: Array<Event_Participant_Types>;
  /** fetch aggregated fields from the table: "event_participant_types" */
  event_participant_types_aggregate: Event_Participant_Types_Aggregate;
  /** fetch data from the table: "event_participant_types" using primary key columns */
  event_participant_types_by_pk?: Maybe<Event_Participant_Types>;
  /** An array relationship */
  event_paticipants: Array<Event_Paticipants>;
  /** An aggregate relationship */
  event_paticipants_aggregate: Event_Paticipants_Aggregate;
  /** fetch data from the table: "event_paticipants" using primary key columns */
  event_paticipants_by_pk?: Maybe<Event_Paticipants>;
  /** fetch data from the table: "events" */
  events: Array<Events>;
  /** fetch aggregated fields from the table: "events" */
  events_aggregate: Events_Aggregate;
  /** fetch data from the table: "events" using primary key columns */
  events_by_pk?: Maybe<Events>;
  /** fetch data from the table: "families" */
  families: Array<Families>;
  /** fetch aggregated fields from the table: "families" */
  families_aggregate: Families_Aggregate;
  /** fetch data from the table: "families" using primary key columns */
  families_by_pk?: Maybe<Families>;
  /** An array relationship */
  family_temples: Array<Family_Temples>;
  /** An aggregate relationship */
  family_temples_aggregate: Family_Temples_Aggregate;
  /** fetch data from the table: "family_temples" using primary key columns */
  family_temples_by_pk?: Maybe<Family_Temples>;
  getTempleById?: Maybe<GetTempleByIdOutput>;
  getTemples?: Maybe<GetTemplesOutput>;
  /** An array relationship */
  images: Array<Images>;
  /** An aggregate relationship */
  images_aggregate: Images_Aggregate;
  /** fetch data from the table: "images" using primary key columns */
  images_by_pk?: Maybe<Images>;
  /** fetch data from the table: "reviews" */
  reviews: Array<Reviews>;
  /** fetch aggregated fields from the table: "reviews" */
  reviews_aggregate: Reviews_Aggregate;
  /** fetch data from the table: "reviews" using primary key columns */
  reviews_by_pk?: Maybe<Reviews>;
  /** fetch data from the table: "temples" */
  temples: Array<Temples>;
  /** fetch aggregated fields from the table: "temples" */
  temples_aggregate: Temples_Aggregate;
  /** fetch data from the table: "temples" using primary key columns */
  temples_by_pk?: Maybe<Temples>;
  /** fetch data from the table: "user_details" */
  user_details: Array<User_Details>;
  /** fetch aggregated fields from the table: "user_details" */
  user_details_aggregate: User_Details_Aggregate;
  /** fetch data from the table: "user_details" using primary key columns */
  user_details_by_pk?: Maybe<User_Details>;
  /** An array relationship */
  users: Array<Users>;
  /** An aggregate relationship */
  users_aggregate: Users_Aggregate;
  /** fetch data from the table: "users" using primary key columns */
  users_by_pk?: Maybe<Users>;
};


export type Query_RootDeceasedArgs = {
  distinct_on?: InputMaybe<Array<Deceased_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Deceased_Order_By>>;
  where?: InputMaybe<Deceased_Bool_Exp>;
};


export type Query_RootDeceased_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Deceased_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Deceased_Order_By>>;
  where?: InputMaybe<Deceased_Bool_Exp>;
};


export type Query_RootDeceased_By_PkArgs = {
  id: Scalars['Int']['input'];
};


export type Query_RootEvent_Participant_TypesArgs = {
  distinct_on?: InputMaybe<Array<Event_Participant_Types_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Event_Participant_Types_Order_By>>;
  where?: InputMaybe<Event_Participant_Types_Bool_Exp>;
};


export type Query_RootEvent_Participant_Types_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Event_Participant_Types_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Event_Participant_Types_Order_By>>;
  where?: InputMaybe<Event_Participant_Types_Bool_Exp>;
};


export type Query_RootEvent_Participant_Types_By_PkArgs = {
  id: Scalars['Int']['input'];
};


export type Query_RootEvent_PaticipantsArgs = {
  distinct_on?: InputMaybe<Array<Event_Paticipants_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Event_Paticipants_Order_By>>;
  where?: InputMaybe<Event_Paticipants_Bool_Exp>;
};


export type Query_RootEvent_Paticipants_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Event_Paticipants_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Event_Paticipants_Order_By>>;
  where?: InputMaybe<Event_Paticipants_Bool_Exp>;
};


export type Query_RootEvent_Paticipants_By_PkArgs = {
  id: Scalars['Int']['input'];
};


export type Query_RootEventsArgs = {
  distinct_on?: InputMaybe<Array<Events_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Events_Order_By>>;
  where?: InputMaybe<Events_Bool_Exp>;
};


export type Query_RootEvents_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Events_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Events_Order_By>>;
  where?: InputMaybe<Events_Bool_Exp>;
};


export type Query_RootEvents_By_PkArgs = {
  id: Scalars['Int']['input'];
};


export type Query_RootFamiliesArgs = {
  distinct_on?: InputMaybe<Array<Families_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Families_Order_By>>;
  where?: InputMaybe<Families_Bool_Exp>;
};


export type Query_RootFamilies_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Families_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Families_Order_By>>;
  where?: InputMaybe<Families_Bool_Exp>;
};


export type Query_RootFamilies_By_PkArgs = {
  id: Scalars['Int']['input'];
};


export type Query_RootFamily_TemplesArgs = {
  distinct_on?: InputMaybe<Array<Family_Temples_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Family_Temples_Order_By>>;
  where?: InputMaybe<Family_Temples_Bool_Exp>;
};


export type Query_RootFamily_Temples_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Family_Temples_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Family_Temples_Order_By>>;
  where?: InputMaybe<Family_Temples_Bool_Exp>;
};


export type Query_RootFamily_Temples_By_PkArgs = {
  id: Scalars['Int']['input'];
};


export type Query_RootGetTempleByIdArgs = {
  query: GetTempleByIdInput;
};


export type Query_RootGetTemplesArgs = {
  query: GetTemplesInput;
};


export type Query_RootImagesArgs = {
  distinct_on?: InputMaybe<Array<Images_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Images_Order_By>>;
  where?: InputMaybe<Images_Bool_Exp>;
};


export type Query_RootImages_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Images_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Images_Order_By>>;
  where?: InputMaybe<Images_Bool_Exp>;
};


export type Query_RootImages_By_PkArgs = {
  id: Scalars['Int']['input'];
};


export type Query_RootReviewsArgs = {
  distinct_on?: InputMaybe<Array<Reviews_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Reviews_Order_By>>;
  where?: InputMaybe<Reviews_Bool_Exp>;
};


export type Query_RootReviews_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Reviews_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Reviews_Order_By>>;
  where?: InputMaybe<Reviews_Bool_Exp>;
};


export type Query_RootReviews_By_PkArgs = {
  id: Scalars['Int']['input'];
};


export type Query_RootTemplesArgs = {
  distinct_on?: InputMaybe<Array<Temples_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Temples_Order_By>>;
  where?: InputMaybe<Temples_Bool_Exp>;
};


export type Query_RootTemples_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Temples_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Temples_Order_By>>;
  where?: InputMaybe<Temples_Bool_Exp>;
};


export type Query_RootTemples_By_PkArgs = {
  id: Scalars['Int']['input'];
};


export type Query_RootUser_DetailsArgs = {
  distinct_on?: InputMaybe<Array<User_Details_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<User_Details_Order_By>>;
  where?: InputMaybe<User_Details_Bool_Exp>;
};


export type Query_RootUser_Details_AggregateArgs = {
  distinct_on?: InputMaybe<Array<User_Details_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<User_Details_Order_By>>;
  where?: InputMaybe<User_Details_Bool_Exp>;
};


export type Query_RootUser_Details_By_PkArgs = {
  id: Scalars['Int']['input'];
};


export type Query_RootUsersArgs = {
  distinct_on?: InputMaybe<Array<Users_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Users_Order_By>>;
  where?: InputMaybe<Users_Bool_Exp>;
};


export type Query_RootUsers_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Users_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Users_Order_By>>;
  where?: InputMaybe<Users_Bool_Exp>;
};


export type Query_RootUsers_By_PkArgs = {
  id: Scalars['Int']['input'];
};

/** columns and relationships of "reviews" */
export type Reviews = {
  __typename?: 'reviews';
  content: Scalars['String']['output'];
  created_at: Scalars['timestamp']['output'];
  event_id?: Maybe<Scalars['Int']['output']>;
  id: Scalars['Int']['output'];
  rating: Scalars['Int']['output'];
  temple_id?: Maybe<Scalars['Int']['output']>;
  updated_at: Scalars['timestamp']['output'];
  user_id: Scalars['Int']['output'];
};

/** aggregated selection of "reviews" */
export type Reviews_Aggregate = {
  __typename?: 'reviews_aggregate';
  aggregate?: Maybe<Reviews_Aggregate_Fields>;
  nodes: Array<Reviews>;
};

/** aggregate fields of "reviews" */
export type Reviews_Aggregate_Fields = {
  __typename?: 'reviews_aggregate_fields';
  avg?: Maybe<Reviews_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Reviews_Max_Fields>;
  min?: Maybe<Reviews_Min_Fields>;
  stddev?: Maybe<Reviews_Stddev_Fields>;
  stddev_pop?: Maybe<Reviews_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Reviews_Stddev_Samp_Fields>;
  sum?: Maybe<Reviews_Sum_Fields>;
  var_pop?: Maybe<Reviews_Var_Pop_Fields>;
  var_samp?: Maybe<Reviews_Var_Samp_Fields>;
  variance?: Maybe<Reviews_Variance_Fields>;
};


/** aggregate fields of "reviews" */
export type Reviews_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Reviews_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** aggregate avg on columns */
export type Reviews_Avg_Fields = {
  __typename?: 'reviews_avg_fields';
  event_id?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  rating?: Maybe<Scalars['Float']['output']>;
  temple_id?: Maybe<Scalars['Float']['output']>;
  user_id?: Maybe<Scalars['Float']['output']>;
};

/** Boolean expression to filter rows from the table "reviews". All fields are combined with a logical 'AND'. */
export type Reviews_Bool_Exp = {
  _and?: InputMaybe<Array<Reviews_Bool_Exp>>;
  _not?: InputMaybe<Reviews_Bool_Exp>;
  _or?: InputMaybe<Array<Reviews_Bool_Exp>>;
  content?: InputMaybe<String_Comparison_Exp>;
  created_at?: InputMaybe<Timestamp_Comparison_Exp>;
  event_id?: InputMaybe<Int_Comparison_Exp>;
  id?: InputMaybe<Int_Comparison_Exp>;
  rating?: InputMaybe<Int_Comparison_Exp>;
  temple_id?: InputMaybe<Int_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamp_Comparison_Exp>;
  user_id?: InputMaybe<Int_Comparison_Exp>;
};

/** unique or primary key constraints on table "reviews" */
export enum Reviews_Constraint {
  /** unique or primary key constraint on columns "id" */
  Pk_231ae565c273ee700b283f15c1d = 'PK_231ae565c273ee700b283f15c1d'
}

/** input type for incrementing numeric columns in table "reviews" */
export type Reviews_Inc_Input = {
  event_id?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  rating?: InputMaybe<Scalars['Int']['input']>;
  temple_id?: InputMaybe<Scalars['Int']['input']>;
  user_id?: InputMaybe<Scalars['Int']['input']>;
};

/** input type for inserting data into table "reviews" */
export type Reviews_Insert_Input = {
  content?: InputMaybe<Scalars['String']['input']>;
  created_at?: InputMaybe<Scalars['timestamp']['input']>;
  event_id?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  rating?: InputMaybe<Scalars['Int']['input']>;
  temple_id?: InputMaybe<Scalars['Int']['input']>;
  updated_at?: InputMaybe<Scalars['timestamp']['input']>;
  user_id?: InputMaybe<Scalars['Int']['input']>;
};

/** aggregate max on columns */
export type Reviews_Max_Fields = {
  __typename?: 'reviews_max_fields';
  content?: Maybe<Scalars['String']['output']>;
  created_at?: Maybe<Scalars['timestamp']['output']>;
  event_id?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  rating?: Maybe<Scalars['Int']['output']>;
  temple_id?: Maybe<Scalars['Int']['output']>;
  updated_at?: Maybe<Scalars['timestamp']['output']>;
  user_id?: Maybe<Scalars['Int']['output']>;
};

/** aggregate min on columns */
export type Reviews_Min_Fields = {
  __typename?: 'reviews_min_fields';
  content?: Maybe<Scalars['String']['output']>;
  created_at?: Maybe<Scalars['timestamp']['output']>;
  event_id?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  rating?: Maybe<Scalars['Int']['output']>;
  temple_id?: Maybe<Scalars['Int']['output']>;
  updated_at?: Maybe<Scalars['timestamp']['output']>;
  user_id?: Maybe<Scalars['Int']['output']>;
};

/** response of any mutation on the table "reviews" */
export type Reviews_Mutation_Response = {
  __typename?: 'reviews_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Reviews>;
};

/** on_conflict condition type for table "reviews" */
export type Reviews_On_Conflict = {
  constraint: Reviews_Constraint;
  update_columns?: Array<Reviews_Update_Column>;
  where?: InputMaybe<Reviews_Bool_Exp>;
};

/** Ordering options when selecting data from "reviews". */
export type Reviews_Order_By = {
  content?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  event_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  rating?: InputMaybe<Order_By>;
  temple_id?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** primary key columns input for table: reviews */
export type Reviews_Pk_Columns_Input = {
  id: Scalars['Int']['input'];
};

/** select columns of table "reviews" */
export enum Reviews_Select_Column {
  /** column name */
  Content = 'content',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  EventId = 'event_id',
  /** column name */
  Id = 'id',
  /** column name */
  Rating = 'rating',
  /** column name */
  TempleId = 'temple_id',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  UserId = 'user_id'
}

/** input type for updating data in table "reviews" */
export type Reviews_Set_Input = {
  content?: InputMaybe<Scalars['String']['input']>;
  created_at?: InputMaybe<Scalars['timestamp']['input']>;
  event_id?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  rating?: InputMaybe<Scalars['Int']['input']>;
  temple_id?: InputMaybe<Scalars['Int']['input']>;
  updated_at?: InputMaybe<Scalars['timestamp']['input']>;
  user_id?: InputMaybe<Scalars['Int']['input']>;
};

/** aggregate stddev on columns */
export type Reviews_Stddev_Fields = {
  __typename?: 'reviews_stddev_fields';
  event_id?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  rating?: Maybe<Scalars['Float']['output']>;
  temple_id?: Maybe<Scalars['Float']['output']>;
  user_id?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_pop on columns */
export type Reviews_Stddev_Pop_Fields = {
  __typename?: 'reviews_stddev_pop_fields';
  event_id?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  rating?: Maybe<Scalars['Float']['output']>;
  temple_id?: Maybe<Scalars['Float']['output']>;
  user_id?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_samp on columns */
export type Reviews_Stddev_Samp_Fields = {
  __typename?: 'reviews_stddev_samp_fields';
  event_id?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  rating?: Maybe<Scalars['Float']['output']>;
  temple_id?: Maybe<Scalars['Float']['output']>;
  user_id?: Maybe<Scalars['Float']['output']>;
};

/** Streaming cursor of the table "reviews" */
export type Reviews_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Reviews_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Reviews_Stream_Cursor_Value_Input = {
  content?: InputMaybe<Scalars['String']['input']>;
  created_at?: InputMaybe<Scalars['timestamp']['input']>;
  event_id?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  rating?: InputMaybe<Scalars['Int']['input']>;
  temple_id?: InputMaybe<Scalars['Int']['input']>;
  updated_at?: InputMaybe<Scalars['timestamp']['input']>;
  user_id?: InputMaybe<Scalars['Int']['input']>;
};

/** aggregate sum on columns */
export type Reviews_Sum_Fields = {
  __typename?: 'reviews_sum_fields';
  event_id?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  rating?: Maybe<Scalars['Int']['output']>;
  temple_id?: Maybe<Scalars['Int']['output']>;
  user_id?: Maybe<Scalars['Int']['output']>;
};

/** update columns of table "reviews" */
export enum Reviews_Update_Column {
  /** column name */
  Content = 'content',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  EventId = 'event_id',
  /** column name */
  Id = 'id',
  /** column name */
  Rating = 'rating',
  /** column name */
  TempleId = 'temple_id',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  UserId = 'user_id'
}

export type Reviews_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Reviews_Inc_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Reviews_Set_Input>;
  /** filter the rows which have to be updated */
  where: Reviews_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Reviews_Var_Pop_Fields = {
  __typename?: 'reviews_var_pop_fields';
  event_id?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  rating?: Maybe<Scalars['Float']['output']>;
  temple_id?: Maybe<Scalars['Float']['output']>;
  user_id?: Maybe<Scalars['Float']['output']>;
};

/** aggregate var_samp on columns */
export type Reviews_Var_Samp_Fields = {
  __typename?: 'reviews_var_samp_fields';
  event_id?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  rating?: Maybe<Scalars['Float']['output']>;
  temple_id?: Maybe<Scalars['Float']['output']>;
  user_id?: Maybe<Scalars['Float']['output']>;
};

/** aggregate variance on columns */
export type Reviews_Variance_Fields = {
  __typename?: 'reviews_variance_fields';
  event_id?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  rating?: Maybe<Scalars['Float']['output']>;
  temple_id?: Maybe<Scalars['Float']['output']>;
  user_id?: Maybe<Scalars['Float']['output']>;
};

export type Subscription_Root = {
  __typename?: 'subscription_root';
  /** fetch data from the table: "deceased" */
  deceased: Array<Deceased>;
  /** fetch aggregated fields from the table: "deceased" */
  deceased_aggregate: Deceased_Aggregate;
  /** fetch data from the table: "deceased" using primary key columns */
  deceased_by_pk?: Maybe<Deceased>;
  /** fetch data from the table in a streaming manner: "deceased" */
  deceased_stream: Array<Deceased>;
  /** fetch data from the table: "event_participant_types" */
  event_participant_types: Array<Event_Participant_Types>;
  /** fetch aggregated fields from the table: "event_participant_types" */
  event_participant_types_aggregate: Event_Participant_Types_Aggregate;
  /** fetch data from the table: "event_participant_types" using primary key columns */
  event_participant_types_by_pk?: Maybe<Event_Participant_Types>;
  /** fetch data from the table in a streaming manner: "event_participant_types" */
  event_participant_types_stream: Array<Event_Participant_Types>;
  /** An array relationship */
  event_paticipants: Array<Event_Paticipants>;
  /** An aggregate relationship */
  event_paticipants_aggregate: Event_Paticipants_Aggregate;
  /** fetch data from the table: "event_paticipants" using primary key columns */
  event_paticipants_by_pk?: Maybe<Event_Paticipants>;
  /** fetch data from the table in a streaming manner: "event_paticipants" */
  event_paticipants_stream: Array<Event_Paticipants>;
  /** fetch data from the table: "events" */
  events: Array<Events>;
  /** fetch aggregated fields from the table: "events" */
  events_aggregate: Events_Aggregate;
  /** fetch data from the table: "events" using primary key columns */
  events_by_pk?: Maybe<Events>;
  /** fetch data from the table in a streaming manner: "events" */
  events_stream: Array<Events>;
  /** fetch data from the table: "families" */
  families: Array<Families>;
  /** fetch aggregated fields from the table: "families" */
  families_aggregate: Families_Aggregate;
  /** fetch data from the table: "families" using primary key columns */
  families_by_pk?: Maybe<Families>;
  /** fetch data from the table in a streaming manner: "families" */
  families_stream: Array<Families>;
  /** An array relationship */
  family_temples: Array<Family_Temples>;
  /** An aggregate relationship */
  family_temples_aggregate: Family_Temples_Aggregate;
  /** fetch data from the table: "family_temples" using primary key columns */
  family_temples_by_pk?: Maybe<Family_Temples>;
  /** fetch data from the table in a streaming manner: "family_temples" */
  family_temples_stream: Array<Family_Temples>;
  /** An array relationship */
  images: Array<Images>;
  /** An aggregate relationship */
  images_aggregate: Images_Aggregate;
  /** fetch data from the table: "images" using primary key columns */
  images_by_pk?: Maybe<Images>;
  /** fetch data from the table in a streaming manner: "images" */
  images_stream: Array<Images>;
  /** fetch data from the table: "reviews" */
  reviews: Array<Reviews>;
  /** fetch aggregated fields from the table: "reviews" */
  reviews_aggregate: Reviews_Aggregate;
  /** fetch data from the table: "reviews" using primary key columns */
  reviews_by_pk?: Maybe<Reviews>;
  /** fetch data from the table in a streaming manner: "reviews" */
  reviews_stream: Array<Reviews>;
  /** fetch data from the table: "temples" */
  temples: Array<Temples>;
  /** fetch aggregated fields from the table: "temples" */
  temples_aggregate: Temples_Aggregate;
  /** fetch data from the table: "temples" using primary key columns */
  temples_by_pk?: Maybe<Temples>;
  /** fetch data from the table in a streaming manner: "temples" */
  temples_stream: Array<Temples>;
  /** fetch data from the table: "user_details" */
  user_details: Array<User_Details>;
  /** fetch aggregated fields from the table: "user_details" */
  user_details_aggregate: User_Details_Aggregate;
  /** fetch data from the table: "user_details" using primary key columns */
  user_details_by_pk?: Maybe<User_Details>;
  /** fetch data from the table in a streaming manner: "user_details" */
  user_details_stream: Array<User_Details>;
  /** An array relationship */
  users: Array<Users>;
  /** An aggregate relationship */
  users_aggregate: Users_Aggregate;
  /** fetch data from the table: "users" using primary key columns */
  users_by_pk?: Maybe<Users>;
  /** fetch data from the table in a streaming manner: "users" */
  users_stream: Array<Users>;
};


export type Subscription_RootDeceasedArgs = {
  distinct_on?: InputMaybe<Array<Deceased_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Deceased_Order_By>>;
  where?: InputMaybe<Deceased_Bool_Exp>;
};


export type Subscription_RootDeceased_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Deceased_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Deceased_Order_By>>;
  where?: InputMaybe<Deceased_Bool_Exp>;
};


export type Subscription_RootDeceased_By_PkArgs = {
  id: Scalars['Int']['input'];
};


export type Subscription_RootDeceased_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Deceased_Stream_Cursor_Input>>;
  where?: InputMaybe<Deceased_Bool_Exp>;
};


export type Subscription_RootEvent_Participant_TypesArgs = {
  distinct_on?: InputMaybe<Array<Event_Participant_Types_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Event_Participant_Types_Order_By>>;
  where?: InputMaybe<Event_Participant_Types_Bool_Exp>;
};


export type Subscription_RootEvent_Participant_Types_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Event_Participant_Types_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Event_Participant_Types_Order_By>>;
  where?: InputMaybe<Event_Participant_Types_Bool_Exp>;
};


export type Subscription_RootEvent_Participant_Types_By_PkArgs = {
  id: Scalars['Int']['input'];
};


export type Subscription_RootEvent_Participant_Types_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Event_Participant_Types_Stream_Cursor_Input>>;
  where?: InputMaybe<Event_Participant_Types_Bool_Exp>;
};


export type Subscription_RootEvent_PaticipantsArgs = {
  distinct_on?: InputMaybe<Array<Event_Paticipants_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Event_Paticipants_Order_By>>;
  where?: InputMaybe<Event_Paticipants_Bool_Exp>;
};


export type Subscription_RootEvent_Paticipants_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Event_Paticipants_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Event_Paticipants_Order_By>>;
  where?: InputMaybe<Event_Paticipants_Bool_Exp>;
};


export type Subscription_RootEvent_Paticipants_By_PkArgs = {
  id: Scalars['Int']['input'];
};


export type Subscription_RootEvent_Paticipants_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Event_Paticipants_Stream_Cursor_Input>>;
  where?: InputMaybe<Event_Paticipants_Bool_Exp>;
};


export type Subscription_RootEventsArgs = {
  distinct_on?: InputMaybe<Array<Events_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Events_Order_By>>;
  where?: InputMaybe<Events_Bool_Exp>;
};


export type Subscription_RootEvents_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Events_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Events_Order_By>>;
  where?: InputMaybe<Events_Bool_Exp>;
};


export type Subscription_RootEvents_By_PkArgs = {
  id: Scalars['Int']['input'];
};


export type Subscription_RootEvents_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Events_Stream_Cursor_Input>>;
  where?: InputMaybe<Events_Bool_Exp>;
};


export type Subscription_RootFamiliesArgs = {
  distinct_on?: InputMaybe<Array<Families_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Families_Order_By>>;
  where?: InputMaybe<Families_Bool_Exp>;
};


export type Subscription_RootFamilies_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Families_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Families_Order_By>>;
  where?: InputMaybe<Families_Bool_Exp>;
};


export type Subscription_RootFamilies_By_PkArgs = {
  id: Scalars['Int']['input'];
};


export type Subscription_RootFamilies_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Families_Stream_Cursor_Input>>;
  where?: InputMaybe<Families_Bool_Exp>;
};


export type Subscription_RootFamily_TemplesArgs = {
  distinct_on?: InputMaybe<Array<Family_Temples_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Family_Temples_Order_By>>;
  where?: InputMaybe<Family_Temples_Bool_Exp>;
};


export type Subscription_RootFamily_Temples_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Family_Temples_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Family_Temples_Order_By>>;
  where?: InputMaybe<Family_Temples_Bool_Exp>;
};


export type Subscription_RootFamily_Temples_By_PkArgs = {
  id: Scalars['Int']['input'];
};


export type Subscription_RootFamily_Temples_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Family_Temples_Stream_Cursor_Input>>;
  where?: InputMaybe<Family_Temples_Bool_Exp>;
};


export type Subscription_RootImagesArgs = {
  distinct_on?: InputMaybe<Array<Images_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Images_Order_By>>;
  where?: InputMaybe<Images_Bool_Exp>;
};


export type Subscription_RootImages_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Images_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Images_Order_By>>;
  where?: InputMaybe<Images_Bool_Exp>;
};


export type Subscription_RootImages_By_PkArgs = {
  id: Scalars['Int']['input'];
};


export type Subscription_RootImages_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Images_Stream_Cursor_Input>>;
  where?: InputMaybe<Images_Bool_Exp>;
};


export type Subscription_RootReviewsArgs = {
  distinct_on?: InputMaybe<Array<Reviews_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Reviews_Order_By>>;
  where?: InputMaybe<Reviews_Bool_Exp>;
};


export type Subscription_RootReviews_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Reviews_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Reviews_Order_By>>;
  where?: InputMaybe<Reviews_Bool_Exp>;
};


export type Subscription_RootReviews_By_PkArgs = {
  id: Scalars['Int']['input'];
};


export type Subscription_RootReviews_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Reviews_Stream_Cursor_Input>>;
  where?: InputMaybe<Reviews_Bool_Exp>;
};


export type Subscription_RootTemplesArgs = {
  distinct_on?: InputMaybe<Array<Temples_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Temples_Order_By>>;
  where?: InputMaybe<Temples_Bool_Exp>;
};


export type Subscription_RootTemples_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Temples_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Temples_Order_By>>;
  where?: InputMaybe<Temples_Bool_Exp>;
};


export type Subscription_RootTemples_By_PkArgs = {
  id: Scalars['Int']['input'];
};


export type Subscription_RootTemples_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Temples_Stream_Cursor_Input>>;
  where?: InputMaybe<Temples_Bool_Exp>;
};


export type Subscription_RootUser_DetailsArgs = {
  distinct_on?: InputMaybe<Array<User_Details_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<User_Details_Order_By>>;
  where?: InputMaybe<User_Details_Bool_Exp>;
};


export type Subscription_RootUser_Details_AggregateArgs = {
  distinct_on?: InputMaybe<Array<User_Details_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<User_Details_Order_By>>;
  where?: InputMaybe<User_Details_Bool_Exp>;
};


export type Subscription_RootUser_Details_By_PkArgs = {
  id: Scalars['Int']['input'];
};


export type Subscription_RootUser_Details_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<User_Details_Stream_Cursor_Input>>;
  where?: InputMaybe<User_Details_Bool_Exp>;
};


export type Subscription_RootUsersArgs = {
  distinct_on?: InputMaybe<Array<Users_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Users_Order_By>>;
  where?: InputMaybe<Users_Bool_Exp>;
};


export type Subscription_RootUsers_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Users_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Users_Order_By>>;
  where?: InputMaybe<Users_Bool_Exp>;
};


export type Subscription_RootUsers_By_PkArgs = {
  id: Scalars['Int']['input'];
};


export type Subscription_RootUsers_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Users_Stream_Cursor_Input>>;
  where?: InputMaybe<Users_Bool_Exp>;
};

/** columns and relationships of "temples" */
export type Temples = {
  __typename?: 'temples';
  address: Scalars['String']['output'];
  admin_id: Scalars['Int']['output'];
  avatar: Scalars['String']['output'];
  created_at: Scalars['timestamp']['output'];
  /** An array relationship */
  deceaseds: Array<Deceased>;
  /** An aggregate relationship */
  deceaseds_aggregate: Deceased_Aggregate;
  description: Scalars['String']['output'];
  email?: Maybe<Scalars['String']['output']>;
  /** An array relationship */
  family_temples: Array<Family_Temples>;
  /** An aggregate relationship */
  family_temples_aggregate: Family_Temples_Aggregate;
  id: Scalars['Int']['output'];
  /** An array relationship */
  images: Array<Images>;
  /** An aggregate relationship */
  images_aggregate: Images_Aggregate;
  name: Scalars['String']['output'];
  phone?: Maybe<Scalars['String']['output']>;
  plan: Scalars['temples_plan_enum']['output'];
  plan_expired?: Maybe<Scalars['date']['output']>;
  priority: Scalars['temples_priority_enum']['output'];
  priority_expired?: Maybe<Scalars['date']['output']>;
  status: Scalars['temples_status_enum']['output'];
  updated_at: Scalars['timestamp']['output'];
  website?: Maybe<Scalars['String']['output']>;
};


/** columns and relationships of "temples" */
export type TemplesDeceasedsArgs = {
  distinct_on?: InputMaybe<Array<Deceased_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Deceased_Order_By>>;
  where?: InputMaybe<Deceased_Bool_Exp>;
};


/** columns and relationships of "temples" */
export type TemplesDeceaseds_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Deceased_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Deceased_Order_By>>;
  where?: InputMaybe<Deceased_Bool_Exp>;
};


/** columns and relationships of "temples" */
export type TemplesFamily_TemplesArgs = {
  distinct_on?: InputMaybe<Array<Family_Temples_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Family_Temples_Order_By>>;
  where?: InputMaybe<Family_Temples_Bool_Exp>;
};


/** columns and relationships of "temples" */
export type TemplesFamily_Temples_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Family_Temples_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Family_Temples_Order_By>>;
  where?: InputMaybe<Family_Temples_Bool_Exp>;
};


/** columns and relationships of "temples" */
export type TemplesImagesArgs = {
  distinct_on?: InputMaybe<Array<Images_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Images_Order_By>>;
  where?: InputMaybe<Images_Bool_Exp>;
};


/** columns and relationships of "temples" */
export type TemplesImages_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Images_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Images_Order_By>>;
  where?: InputMaybe<Images_Bool_Exp>;
};

/** aggregated selection of "temples" */
export type Temples_Aggregate = {
  __typename?: 'temples_aggregate';
  aggregate?: Maybe<Temples_Aggregate_Fields>;
  nodes: Array<Temples>;
};

/** aggregate fields of "temples" */
export type Temples_Aggregate_Fields = {
  __typename?: 'temples_aggregate_fields';
  avg?: Maybe<Temples_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Temples_Max_Fields>;
  min?: Maybe<Temples_Min_Fields>;
  stddev?: Maybe<Temples_Stddev_Fields>;
  stddev_pop?: Maybe<Temples_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Temples_Stddev_Samp_Fields>;
  sum?: Maybe<Temples_Sum_Fields>;
  var_pop?: Maybe<Temples_Var_Pop_Fields>;
  var_samp?: Maybe<Temples_Var_Samp_Fields>;
  variance?: Maybe<Temples_Variance_Fields>;
};


/** aggregate fields of "temples" */
export type Temples_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Temples_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** aggregate avg on columns */
export type Temples_Avg_Fields = {
  __typename?: 'temples_avg_fields';
  admin_id?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
};

/** Boolean expression to filter rows from the table "temples". All fields are combined with a logical 'AND'. */
export type Temples_Bool_Exp = {
  _and?: InputMaybe<Array<Temples_Bool_Exp>>;
  _not?: InputMaybe<Temples_Bool_Exp>;
  _or?: InputMaybe<Array<Temples_Bool_Exp>>;
  address?: InputMaybe<String_Comparison_Exp>;
  admin_id?: InputMaybe<Int_Comparison_Exp>;
  avatar?: InputMaybe<String_Comparison_Exp>;
  created_at?: InputMaybe<Timestamp_Comparison_Exp>;
  deceaseds?: InputMaybe<Deceased_Bool_Exp>;
  deceaseds_aggregate?: InputMaybe<Deceased_Aggregate_Bool_Exp>;
  description?: InputMaybe<String_Comparison_Exp>;
  email?: InputMaybe<String_Comparison_Exp>;
  family_temples?: InputMaybe<Family_Temples_Bool_Exp>;
  family_temples_aggregate?: InputMaybe<Family_Temples_Aggregate_Bool_Exp>;
  id?: InputMaybe<Int_Comparison_Exp>;
  images?: InputMaybe<Images_Bool_Exp>;
  images_aggregate?: InputMaybe<Images_Aggregate_Bool_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  phone?: InputMaybe<String_Comparison_Exp>;
  plan?: InputMaybe<Temples_Plan_Enum_Comparison_Exp>;
  plan_expired?: InputMaybe<Date_Comparison_Exp>;
  priority?: InputMaybe<Temples_Priority_Enum_Comparison_Exp>;
  priority_expired?: InputMaybe<Date_Comparison_Exp>;
  status?: InputMaybe<Temples_Status_Enum_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamp_Comparison_Exp>;
  website?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "temples" */
export enum Temples_Constraint {
  /** unique or primary key constraint on columns "id" */
  PkAfcd9274b5ee523a6475599e46c = 'PK_afcd9274b5ee523a6475599e46c'
}

/** input type for incrementing numeric columns in table "temples" */
export type Temples_Inc_Input = {
  admin_id?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
};

/** input type for inserting data into table "temples" */
export type Temples_Insert_Input = {
  address?: InputMaybe<Scalars['String']['input']>;
  admin_id?: InputMaybe<Scalars['Int']['input']>;
  avatar?: InputMaybe<Scalars['String']['input']>;
  created_at?: InputMaybe<Scalars['timestamp']['input']>;
  deceaseds?: InputMaybe<Deceased_Arr_Rel_Insert_Input>;
  description?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  family_temples?: InputMaybe<Family_Temples_Arr_Rel_Insert_Input>;
  id?: InputMaybe<Scalars['Int']['input']>;
  images?: InputMaybe<Images_Arr_Rel_Insert_Input>;
  name?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
  plan?: InputMaybe<Scalars['temples_plan_enum']['input']>;
  plan_expired?: InputMaybe<Scalars['date']['input']>;
  priority?: InputMaybe<Scalars['temples_priority_enum']['input']>;
  priority_expired?: InputMaybe<Scalars['date']['input']>;
  status?: InputMaybe<Scalars['temples_status_enum']['input']>;
  updated_at?: InputMaybe<Scalars['timestamp']['input']>;
  website?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate max on columns */
export type Temples_Max_Fields = {
  __typename?: 'temples_max_fields';
  address?: Maybe<Scalars['String']['output']>;
  admin_id?: Maybe<Scalars['Int']['output']>;
  avatar?: Maybe<Scalars['String']['output']>;
  created_at?: Maybe<Scalars['timestamp']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  phone?: Maybe<Scalars['String']['output']>;
  plan?: Maybe<Scalars['temples_plan_enum']['output']>;
  plan_expired?: Maybe<Scalars['date']['output']>;
  priority?: Maybe<Scalars['temples_priority_enum']['output']>;
  priority_expired?: Maybe<Scalars['date']['output']>;
  status?: Maybe<Scalars['temples_status_enum']['output']>;
  updated_at?: Maybe<Scalars['timestamp']['output']>;
  website?: Maybe<Scalars['String']['output']>;
};

/** aggregate min on columns */
export type Temples_Min_Fields = {
  __typename?: 'temples_min_fields';
  address?: Maybe<Scalars['String']['output']>;
  admin_id?: Maybe<Scalars['Int']['output']>;
  avatar?: Maybe<Scalars['String']['output']>;
  created_at?: Maybe<Scalars['timestamp']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  phone?: Maybe<Scalars['String']['output']>;
  plan?: Maybe<Scalars['temples_plan_enum']['output']>;
  plan_expired?: Maybe<Scalars['date']['output']>;
  priority?: Maybe<Scalars['temples_priority_enum']['output']>;
  priority_expired?: Maybe<Scalars['date']['output']>;
  status?: Maybe<Scalars['temples_status_enum']['output']>;
  updated_at?: Maybe<Scalars['timestamp']['output']>;
  website?: Maybe<Scalars['String']['output']>;
};

/** response of any mutation on the table "temples" */
export type Temples_Mutation_Response = {
  __typename?: 'temples_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Temples>;
};

/** input type for inserting object relation for remote table "temples" */
export type Temples_Obj_Rel_Insert_Input = {
  data: Temples_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Temples_On_Conflict>;
};

/** on_conflict condition type for table "temples" */
export type Temples_On_Conflict = {
  constraint: Temples_Constraint;
  update_columns?: Array<Temples_Update_Column>;
  where?: InputMaybe<Temples_Bool_Exp>;
};

/** Ordering options when selecting data from "temples". */
export type Temples_Order_By = {
  address?: InputMaybe<Order_By>;
  admin_id?: InputMaybe<Order_By>;
  avatar?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  deceaseds_aggregate?: InputMaybe<Deceased_Aggregate_Order_By>;
  description?: InputMaybe<Order_By>;
  email?: InputMaybe<Order_By>;
  family_temples_aggregate?: InputMaybe<Family_Temples_Aggregate_Order_By>;
  id?: InputMaybe<Order_By>;
  images_aggregate?: InputMaybe<Images_Aggregate_Order_By>;
  name?: InputMaybe<Order_By>;
  phone?: InputMaybe<Order_By>;
  plan?: InputMaybe<Order_By>;
  plan_expired?: InputMaybe<Order_By>;
  priority?: InputMaybe<Order_By>;
  priority_expired?: InputMaybe<Order_By>;
  status?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  website?: InputMaybe<Order_By>;
};

/** primary key columns input for table: temples */
export type Temples_Pk_Columns_Input = {
  id: Scalars['Int']['input'];
};

/** Boolean expression to compare columns of type "temples_plan_enum". All fields are combined with logical 'AND'. */
export type Temples_Plan_Enum_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['temples_plan_enum']['input']>;
  _gt?: InputMaybe<Scalars['temples_plan_enum']['input']>;
  _gte?: InputMaybe<Scalars['temples_plan_enum']['input']>;
  _in?: InputMaybe<Array<Scalars['temples_plan_enum']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['temples_plan_enum']['input']>;
  _lte?: InputMaybe<Scalars['temples_plan_enum']['input']>;
  _neq?: InputMaybe<Scalars['temples_plan_enum']['input']>;
  _nin?: InputMaybe<Array<Scalars['temples_plan_enum']['input']>>;
};

/** Boolean expression to compare columns of type "temples_priority_enum". All fields are combined with logical 'AND'. */
export type Temples_Priority_Enum_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['temples_priority_enum']['input']>;
  _gt?: InputMaybe<Scalars['temples_priority_enum']['input']>;
  _gte?: InputMaybe<Scalars['temples_priority_enum']['input']>;
  _in?: InputMaybe<Array<Scalars['temples_priority_enum']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['temples_priority_enum']['input']>;
  _lte?: InputMaybe<Scalars['temples_priority_enum']['input']>;
  _neq?: InputMaybe<Scalars['temples_priority_enum']['input']>;
  _nin?: InputMaybe<Array<Scalars['temples_priority_enum']['input']>>;
};

/** select columns of table "temples" */
export enum Temples_Select_Column {
  /** column name */
  Address = 'address',
  /** column name */
  AdminId = 'admin_id',
  /** column name */
  Avatar = 'avatar',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Description = 'description',
  /** column name */
  Email = 'email',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  Phone = 'phone',
  /** column name */
  Plan = 'plan',
  /** column name */
  PlanExpired = 'plan_expired',
  /** column name */
  Priority = 'priority',
  /** column name */
  PriorityExpired = 'priority_expired',
  /** column name */
  Status = 'status',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  Website = 'website'
}

/** input type for updating data in table "temples" */
export type Temples_Set_Input = {
  address?: InputMaybe<Scalars['String']['input']>;
  admin_id?: InputMaybe<Scalars['Int']['input']>;
  avatar?: InputMaybe<Scalars['String']['input']>;
  created_at?: InputMaybe<Scalars['timestamp']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
  plan?: InputMaybe<Scalars['temples_plan_enum']['input']>;
  plan_expired?: InputMaybe<Scalars['date']['input']>;
  priority?: InputMaybe<Scalars['temples_priority_enum']['input']>;
  priority_expired?: InputMaybe<Scalars['date']['input']>;
  status?: InputMaybe<Scalars['temples_status_enum']['input']>;
  updated_at?: InputMaybe<Scalars['timestamp']['input']>;
  website?: InputMaybe<Scalars['String']['input']>;
};

/** Boolean expression to compare columns of type "temples_status_enum". All fields are combined with logical 'AND'. */
export type Temples_Status_Enum_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['temples_status_enum']['input']>;
  _gt?: InputMaybe<Scalars['temples_status_enum']['input']>;
  _gte?: InputMaybe<Scalars['temples_status_enum']['input']>;
  _in?: InputMaybe<Array<Scalars['temples_status_enum']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['temples_status_enum']['input']>;
  _lte?: InputMaybe<Scalars['temples_status_enum']['input']>;
  _neq?: InputMaybe<Scalars['temples_status_enum']['input']>;
  _nin?: InputMaybe<Array<Scalars['temples_status_enum']['input']>>;
};

/** aggregate stddev on columns */
export type Temples_Stddev_Fields = {
  __typename?: 'temples_stddev_fields';
  admin_id?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_pop on columns */
export type Temples_Stddev_Pop_Fields = {
  __typename?: 'temples_stddev_pop_fields';
  admin_id?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_samp on columns */
export type Temples_Stddev_Samp_Fields = {
  __typename?: 'temples_stddev_samp_fields';
  admin_id?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
};

/** Streaming cursor of the table "temples" */
export type Temples_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Temples_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Temples_Stream_Cursor_Value_Input = {
  address?: InputMaybe<Scalars['String']['input']>;
  admin_id?: InputMaybe<Scalars['Int']['input']>;
  avatar?: InputMaybe<Scalars['String']['input']>;
  created_at?: InputMaybe<Scalars['timestamp']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
  plan?: InputMaybe<Scalars['temples_plan_enum']['input']>;
  plan_expired?: InputMaybe<Scalars['date']['input']>;
  priority?: InputMaybe<Scalars['temples_priority_enum']['input']>;
  priority_expired?: InputMaybe<Scalars['date']['input']>;
  status?: InputMaybe<Scalars['temples_status_enum']['input']>;
  updated_at?: InputMaybe<Scalars['timestamp']['input']>;
  website?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate sum on columns */
export type Temples_Sum_Fields = {
  __typename?: 'temples_sum_fields';
  admin_id?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
};

/** update columns of table "temples" */
export enum Temples_Update_Column {
  /** column name */
  Address = 'address',
  /** column name */
  AdminId = 'admin_id',
  /** column name */
  Avatar = 'avatar',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Description = 'description',
  /** column name */
  Email = 'email',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  Phone = 'phone',
  /** column name */
  Plan = 'plan',
  /** column name */
  PlanExpired = 'plan_expired',
  /** column name */
  Priority = 'priority',
  /** column name */
  PriorityExpired = 'priority_expired',
  /** column name */
  Status = 'status',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  Website = 'website'
}

export type Temples_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Temples_Inc_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Temples_Set_Input>;
  /** filter the rows which have to be updated */
  where: Temples_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Temples_Var_Pop_Fields = {
  __typename?: 'temples_var_pop_fields';
  admin_id?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
};

/** aggregate var_samp on columns */
export type Temples_Var_Samp_Fields = {
  __typename?: 'temples_var_samp_fields';
  admin_id?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
};

/** aggregate variance on columns */
export type Temples_Variance_Fields = {
  __typename?: 'temples_variance_fields';
  admin_id?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
};

/** Boolean expression to compare columns of type "timestamp". All fields are combined with logical 'AND'. */
export type Timestamp_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['timestamp']['input']>;
  _gt?: InputMaybe<Scalars['timestamp']['input']>;
  _gte?: InputMaybe<Scalars['timestamp']['input']>;
  _in?: InputMaybe<Array<Scalars['timestamp']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['timestamp']['input']>;
  _lte?: InputMaybe<Scalars['timestamp']['input']>;
  _neq?: InputMaybe<Scalars['timestamp']['input']>;
  _nin?: InputMaybe<Array<Scalars['timestamp']['input']>>;
};

/** columns and relationships of "user_details" */
export type User_Details = {
  __typename?: 'user_details';
  address?: Maybe<Scalars['String']['output']>;
  avatar?: Maybe<Scalars['String']['output']>;
  birthday: Scalars['date']['output'];
  citizen_number?: Maybe<Scalars['String']['output']>;
  created_at: Scalars['timestamp']['output'];
  /** An object relationship */
  deceased?: Maybe<Deceased>;
  gender: Scalars['user_details_gender_enum']['output'];
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  phone?: Maybe<Scalars['String']['output']>;
  updated_at: Scalars['timestamp']['output'];
  /** An object relationship */
  user?: Maybe<Users>;
};

/** aggregated selection of "user_details" */
export type User_Details_Aggregate = {
  __typename?: 'user_details_aggregate';
  aggregate?: Maybe<User_Details_Aggregate_Fields>;
  nodes: Array<User_Details>;
};

/** aggregate fields of "user_details" */
export type User_Details_Aggregate_Fields = {
  __typename?: 'user_details_aggregate_fields';
  avg?: Maybe<User_Details_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<User_Details_Max_Fields>;
  min?: Maybe<User_Details_Min_Fields>;
  stddev?: Maybe<User_Details_Stddev_Fields>;
  stddev_pop?: Maybe<User_Details_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<User_Details_Stddev_Samp_Fields>;
  sum?: Maybe<User_Details_Sum_Fields>;
  var_pop?: Maybe<User_Details_Var_Pop_Fields>;
  var_samp?: Maybe<User_Details_Var_Samp_Fields>;
  variance?: Maybe<User_Details_Variance_Fields>;
};


/** aggregate fields of "user_details" */
export type User_Details_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<User_Details_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** aggregate avg on columns */
export type User_Details_Avg_Fields = {
  __typename?: 'user_details_avg_fields';
  id?: Maybe<Scalars['Float']['output']>;
};

/** Boolean expression to filter rows from the table "user_details". All fields are combined with a logical 'AND'. */
export type User_Details_Bool_Exp = {
  _and?: InputMaybe<Array<User_Details_Bool_Exp>>;
  _not?: InputMaybe<User_Details_Bool_Exp>;
  _or?: InputMaybe<Array<User_Details_Bool_Exp>>;
  address?: InputMaybe<String_Comparison_Exp>;
  avatar?: InputMaybe<String_Comparison_Exp>;
  birthday?: InputMaybe<Date_Comparison_Exp>;
  citizen_number?: InputMaybe<String_Comparison_Exp>;
  created_at?: InputMaybe<Timestamp_Comparison_Exp>;
  deceased?: InputMaybe<Deceased_Bool_Exp>;
  gender?: InputMaybe<User_Details_Gender_Enum_Comparison_Exp>;
  id?: InputMaybe<Int_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  phone?: InputMaybe<String_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamp_Comparison_Exp>;
  user?: InputMaybe<Users_Bool_Exp>;
};

/** unique or primary key constraints on table "user_details" */
export enum User_Details_Constraint {
  /** unique or primary key constraint on columns "id" */
  PkFb08394d3f499b9e441cab9ca51 = 'PK_fb08394d3f499b9e441cab9ca51'
}

/** Boolean expression to compare columns of type "user_details_gender_enum". All fields are combined with logical 'AND'. */
export type User_Details_Gender_Enum_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['user_details_gender_enum']['input']>;
  _gt?: InputMaybe<Scalars['user_details_gender_enum']['input']>;
  _gte?: InputMaybe<Scalars['user_details_gender_enum']['input']>;
  _in?: InputMaybe<Array<Scalars['user_details_gender_enum']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['user_details_gender_enum']['input']>;
  _lte?: InputMaybe<Scalars['user_details_gender_enum']['input']>;
  _neq?: InputMaybe<Scalars['user_details_gender_enum']['input']>;
  _nin?: InputMaybe<Array<Scalars['user_details_gender_enum']['input']>>;
};

/** input type for incrementing numeric columns in table "user_details" */
export type User_Details_Inc_Input = {
  id?: InputMaybe<Scalars['Int']['input']>;
};

/** input type for inserting data into table "user_details" */
export type User_Details_Insert_Input = {
  address?: InputMaybe<Scalars['String']['input']>;
  avatar?: InputMaybe<Scalars['String']['input']>;
  birthday?: InputMaybe<Scalars['date']['input']>;
  citizen_number?: InputMaybe<Scalars['String']['input']>;
  created_at?: InputMaybe<Scalars['timestamp']['input']>;
  deceased?: InputMaybe<Deceased_Obj_Rel_Insert_Input>;
  gender?: InputMaybe<Scalars['user_details_gender_enum']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
  updated_at?: InputMaybe<Scalars['timestamp']['input']>;
  user?: InputMaybe<Users_Obj_Rel_Insert_Input>;
};

/** aggregate max on columns */
export type User_Details_Max_Fields = {
  __typename?: 'user_details_max_fields';
  address?: Maybe<Scalars['String']['output']>;
  avatar?: Maybe<Scalars['String']['output']>;
  birthday?: Maybe<Scalars['date']['output']>;
  citizen_number?: Maybe<Scalars['String']['output']>;
  created_at?: Maybe<Scalars['timestamp']['output']>;
  gender?: Maybe<Scalars['user_details_gender_enum']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  phone?: Maybe<Scalars['String']['output']>;
  updated_at?: Maybe<Scalars['timestamp']['output']>;
};

/** aggregate min on columns */
export type User_Details_Min_Fields = {
  __typename?: 'user_details_min_fields';
  address?: Maybe<Scalars['String']['output']>;
  avatar?: Maybe<Scalars['String']['output']>;
  birthday?: Maybe<Scalars['date']['output']>;
  citizen_number?: Maybe<Scalars['String']['output']>;
  created_at?: Maybe<Scalars['timestamp']['output']>;
  gender?: Maybe<Scalars['user_details_gender_enum']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  phone?: Maybe<Scalars['String']['output']>;
  updated_at?: Maybe<Scalars['timestamp']['output']>;
};

/** response of any mutation on the table "user_details" */
export type User_Details_Mutation_Response = {
  __typename?: 'user_details_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<User_Details>;
};

/** input type for inserting object relation for remote table "user_details" */
export type User_Details_Obj_Rel_Insert_Input = {
  data: User_Details_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<User_Details_On_Conflict>;
};

/** on_conflict condition type for table "user_details" */
export type User_Details_On_Conflict = {
  constraint: User_Details_Constraint;
  update_columns?: Array<User_Details_Update_Column>;
  where?: InputMaybe<User_Details_Bool_Exp>;
};

/** Ordering options when selecting data from "user_details". */
export type User_Details_Order_By = {
  address?: InputMaybe<Order_By>;
  avatar?: InputMaybe<Order_By>;
  birthday?: InputMaybe<Order_By>;
  citizen_number?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  deceased?: InputMaybe<Deceased_Order_By>;
  gender?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  phone?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  user?: InputMaybe<Users_Order_By>;
};

/** primary key columns input for table: user_details */
export type User_Details_Pk_Columns_Input = {
  id: Scalars['Int']['input'];
};

/** select columns of table "user_details" */
export enum User_Details_Select_Column {
  /** column name */
  Address = 'address',
  /** column name */
  Avatar = 'avatar',
  /** column name */
  Birthday = 'birthday',
  /** column name */
  CitizenNumber = 'citizen_number',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Gender = 'gender',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  Phone = 'phone',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** input type for updating data in table "user_details" */
export type User_Details_Set_Input = {
  address?: InputMaybe<Scalars['String']['input']>;
  avatar?: InputMaybe<Scalars['String']['input']>;
  birthday?: InputMaybe<Scalars['date']['input']>;
  citizen_number?: InputMaybe<Scalars['String']['input']>;
  created_at?: InputMaybe<Scalars['timestamp']['input']>;
  gender?: InputMaybe<Scalars['user_details_gender_enum']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
  updated_at?: InputMaybe<Scalars['timestamp']['input']>;
};

/** aggregate stddev on columns */
export type User_Details_Stddev_Fields = {
  __typename?: 'user_details_stddev_fields';
  id?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_pop on columns */
export type User_Details_Stddev_Pop_Fields = {
  __typename?: 'user_details_stddev_pop_fields';
  id?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_samp on columns */
export type User_Details_Stddev_Samp_Fields = {
  __typename?: 'user_details_stddev_samp_fields';
  id?: Maybe<Scalars['Float']['output']>;
};

/** Streaming cursor of the table "user_details" */
export type User_Details_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: User_Details_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type User_Details_Stream_Cursor_Value_Input = {
  address?: InputMaybe<Scalars['String']['input']>;
  avatar?: InputMaybe<Scalars['String']['input']>;
  birthday?: InputMaybe<Scalars['date']['input']>;
  citizen_number?: InputMaybe<Scalars['String']['input']>;
  created_at?: InputMaybe<Scalars['timestamp']['input']>;
  gender?: InputMaybe<Scalars['user_details_gender_enum']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
  updated_at?: InputMaybe<Scalars['timestamp']['input']>;
};

/** aggregate sum on columns */
export type User_Details_Sum_Fields = {
  __typename?: 'user_details_sum_fields';
  id?: Maybe<Scalars['Int']['output']>;
};

/** update columns of table "user_details" */
export enum User_Details_Update_Column {
  /** column name */
  Address = 'address',
  /** column name */
  Avatar = 'avatar',
  /** column name */
  Birthday = 'birthday',
  /** column name */
  CitizenNumber = 'citizen_number',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Gender = 'gender',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  Phone = 'phone',
  /** column name */
  UpdatedAt = 'updated_at'
}

export type User_Details_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<User_Details_Inc_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<User_Details_Set_Input>;
  /** filter the rows which have to be updated */
  where: User_Details_Bool_Exp;
};

/** aggregate var_pop on columns */
export type User_Details_Var_Pop_Fields = {
  __typename?: 'user_details_var_pop_fields';
  id?: Maybe<Scalars['Float']['output']>;
};

/** aggregate var_samp on columns */
export type User_Details_Var_Samp_Fields = {
  __typename?: 'user_details_var_samp_fields';
  id?: Maybe<Scalars['Float']['output']>;
};

/** aggregate variance on columns */
export type User_Details_Variance_Fields = {
  __typename?: 'user_details_variance_fields';
  id?: Maybe<Scalars['Float']['output']>;
};

/** columns and relationships of "users" */
export type Users = {
  __typename?: 'users';
  created_at: Scalars['timestamp']['output'];
  email: Scalars['String']['output'];
  /** An object relationship */
  family?: Maybe<Families>;
  family_id?: Maybe<Scalars['Int']['output']>;
  id: Scalars['Int']['output'];
  password: Scalars['String']['output'];
  refresh_token?: Maybe<Scalars['String']['output']>;
  role: Scalars['users_role_enum']['output'];
  updated_at: Scalars['timestamp']['output'];
  /** An object relationship */
  user_detail?: Maybe<User_Details>;
  user_detail_id?: Maybe<Scalars['Int']['output']>;
};

/** aggregated selection of "users" */
export type Users_Aggregate = {
  __typename?: 'users_aggregate';
  aggregate?: Maybe<Users_Aggregate_Fields>;
  nodes: Array<Users>;
};

export type Users_Aggregate_Bool_Exp = {
  count?: InputMaybe<Users_Aggregate_Bool_Exp_Count>;
};

export type Users_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Users_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Users_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "users" */
export type Users_Aggregate_Fields = {
  __typename?: 'users_aggregate_fields';
  avg?: Maybe<Users_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Users_Max_Fields>;
  min?: Maybe<Users_Min_Fields>;
  stddev?: Maybe<Users_Stddev_Fields>;
  stddev_pop?: Maybe<Users_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Users_Stddev_Samp_Fields>;
  sum?: Maybe<Users_Sum_Fields>;
  var_pop?: Maybe<Users_Var_Pop_Fields>;
  var_samp?: Maybe<Users_Var_Samp_Fields>;
  variance?: Maybe<Users_Variance_Fields>;
};


/** aggregate fields of "users" */
export type Users_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Users_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "users" */
export type Users_Aggregate_Order_By = {
  avg?: InputMaybe<Users_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Users_Max_Order_By>;
  min?: InputMaybe<Users_Min_Order_By>;
  stddev?: InputMaybe<Users_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Users_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Users_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Users_Sum_Order_By>;
  var_pop?: InputMaybe<Users_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Users_Var_Samp_Order_By>;
  variance?: InputMaybe<Users_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "users" */
export type Users_Arr_Rel_Insert_Input = {
  data: Array<Users_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Users_On_Conflict>;
};

/** aggregate avg on columns */
export type Users_Avg_Fields = {
  __typename?: 'users_avg_fields';
  family_id?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  user_detail_id?: Maybe<Scalars['Float']['output']>;
};

/** order by avg() on columns of table "users" */
export type Users_Avg_Order_By = {
  family_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  user_detail_id?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "users". All fields are combined with a logical 'AND'. */
export type Users_Bool_Exp = {
  _and?: InputMaybe<Array<Users_Bool_Exp>>;
  _not?: InputMaybe<Users_Bool_Exp>;
  _or?: InputMaybe<Array<Users_Bool_Exp>>;
  created_at?: InputMaybe<Timestamp_Comparison_Exp>;
  email?: InputMaybe<String_Comparison_Exp>;
  family?: InputMaybe<Families_Bool_Exp>;
  family_id?: InputMaybe<Int_Comparison_Exp>;
  id?: InputMaybe<Int_Comparison_Exp>;
  password?: InputMaybe<String_Comparison_Exp>;
  refresh_token?: InputMaybe<String_Comparison_Exp>;
  role?: InputMaybe<Users_Role_Enum_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamp_Comparison_Exp>;
  user_detail?: InputMaybe<User_Details_Bool_Exp>;
  user_detail_id?: InputMaybe<Int_Comparison_Exp>;
};

/** unique or primary key constraints on table "users" */
export enum Users_Constraint {
  /** unique or primary key constraint on columns "id" */
  PkA3ffb1c0c8416b9fc6f907b7433 = 'PK_a3ffb1c0c8416b9fc6f907b7433',
  /** unique or primary key constraint on columns "user_detail_id" */
  Rel_7fbd789ba2d9f9643ff3be7e7b = 'REL_7fbd789ba2d9f9643ff3be7e7b'
}

/** input type for incrementing numeric columns in table "users" */
export type Users_Inc_Input = {
  family_id?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  user_detail_id?: InputMaybe<Scalars['Int']['input']>;
};

/** input type for inserting data into table "users" */
export type Users_Insert_Input = {
  created_at?: InputMaybe<Scalars['timestamp']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  family?: InputMaybe<Families_Obj_Rel_Insert_Input>;
  family_id?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  refresh_token?: InputMaybe<Scalars['String']['input']>;
  role?: InputMaybe<Scalars['users_role_enum']['input']>;
  updated_at?: InputMaybe<Scalars['timestamp']['input']>;
  user_detail?: InputMaybe<User_Details_Obj_Rel_Insert_Input>;
  user_detail_id?: InputMaybe<Scalars['Int']['input']>;
};

/** aggregate max on columns */
export type Users_Max_Fields = {
  __typename?: 'users_max_fields';
  created_at?: Maybe<Scalars['timestamp']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  family_id?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  password?: Maybe<Scalars['String']['output']>;
  refresh_token?: Maybe<Scalars['String']['output']>;
  role?: Maybe<Scalars['users_role_enum']['output']>;
  updated_at?: Maybe<Scalars['timestamp']['output']>;
  user_detail_id?: Maybe<Scalars['Int']['output']>;
};

/** order by max() on columns of table "users" */
export type Users_Max_Order_By = {
  created_at?: InputMaybe<Order_By>;
  email?: InputMaybe<Order_By>;
  family_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  password?: InputMaybe<Order_By>;
  refresh_token?: InputMaybe<Order_By>;
  role?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  user_detail_id?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Users_Min_Fields = {
  __typename?: 'users_min_fields';
  created_at?: Maybe<Scalars['timestamp']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  family_id?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  password?: Maybe<Scalars['String']['output']>;
  refresh_token?: Maybe<Scalars['String']['output']>;
  role?: Maybe<Scalars['users_role_enum']['output']>;
  updated_at?: Maybe<Scalars['timestamp']['output']>;
  user_detail_id?: Maybe<Scalars['Int']['output']>;
};

/** order by min() on columns of table "users" */
export type Users_Min_Order_By = {
  created_at?: InputMaybe<Order_By>;
  email?: InputMaybe<Order_By>;
  family_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  password?: InputMaybe<Order_By>;
  refresh_token?: InputMaybe<Order_By>;
  role?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  user_detail_id?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "users" */
export type Users_Mutation_Response = {
  __typename?: 'users_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Users>;
};

/** input type for inserting object relation for remote table "users" */
export type Users_Obj_Rel_Insert_Input = {
  data: Users_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Users_On_Conflict>;
};

/** on_conflict condition type for table "users" */
export type Users_On_Conflict = {
  constraint: Users_Constraint;
  update_columns?: Array<Users_Update_Column>;
  where?: InputMaybe<Users_Bool_Exp>;
};

/** Ordering options when selecting data from "users". */
export type Users_Order_By = {
  created_at?: InputMaybe<Order_By>;
  email?: InputMaybe<Order_By>;
  family?: InputMaybe<Families_Order_By>;
  family_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  password?: InputMaybe<Order_By>;
  refresh_token?: InputMaybe<Order_By>;
  role?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  user_detail?: InputMaybe<User_Details_Order_By>;
  user_detail_id?: InputMaybe<Order_By>;
};

/** primary key columns input for table: users */
export type Users_Pk_Columns_Input = {
  id: Scalars['Int']['input'];
};

/** Boolean expression to compare columns of type "users_role_enum". All fields are combined with logical 'AND'. */
export type Users_Role_Enum_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['users_role_enum']['input']>;
  _gt?: InputMaybe<Scalars['users_role_enum']['input']>;
  _gte?: InputMaybe<Scalars['users_role_enum']['input']>;
  _in?: InputMaybe<Array<Scalars['users_role_enum']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['users_role_enum']['input']>;
  _lte?: InputMaybe<Scalars['users_role_enum']['input']>;
  _neq?: InputMaybe<Scalars['users_role_enum']['input']>;
  _nin?: InputMaybe<Array<Scalars['users_role_enum']['input']>>;
};

/** select columns of table "users" */
export enum Users_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Email = 'email',
  /** column name */
  FamilyId = 'family_id',
  /** column name */
  Id = 'id',
  /** column name */
  Password = 'password',
  /** column name */
  RefreshToken = 'refresh_token',
  /** column name */
  Role = 'role',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  UserDetailId = 'user_detail_id'
}

/** input type for updating data in table "users" */
export type Users_Set_Input = {
  created_at?: InputMaybe<Scalars['timestamp']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  family_id?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  refresh_token?: InputMaybe<Scalars['String']['input']>;
  role?: InputMaybe<Scalars['users_role_enum']['input']>;
  updated_at?: InputMaybe<Scalars['timestamp']['input']>;
  user_detail_id?: InputMaybe<Scalars['Int']['input']>;
};

/** aggregate stddev on columns */
export type Users_Stddev_Fields = {
  __typename?: 'users_stddev_fields';
  family_id?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  user_detail_id?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev() on columns of table "users" */
export type Users_Stddev_Order_By = {
  family_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  user_detail_id?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Users_Stddev_Pop_Fields = {
  __typename?: 'users_stddev_pop_fields';
  family_id?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  user_detail_id?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_pop() on columns of table "users" */
export type Users_Stddev_Pop_Order_By = {
  family_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  user_detail_id?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Users_Stddev_Samp_Fields = {
  __typename?: 'users_stddev_samp_fields';
  family_id?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  user_detail_id?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_samp() on columns of table "users" */
export type Users_Stddev_Samp_Order_By = {
  family_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  user_detail_id?: InputMaybe<Order_By>;
};

/** Streaming cursor of the table "users" */
export type Users_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Users_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Users_Stream_Cursor_Value_Input = {
  created_at?: InputMaybe<Scalars['timestamp']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  family_id?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  refresh_token?: InputMaybe<Scalars['String']['input']>;
  role?: InputMaybe<Scalars['users_role_enum']['input']>;
  updated_at?: InputMaybe<Scalars['timestamp']['input']>;
  user_detail_id?: InputMaybe<Scalars['Int']['input']>;
};

/** aggregate sum on columns */
export type Users_Sum_Fields = {
  __typename?: 'users_sum_fields';
  family_id?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  user_detail_id?: Maybe<Scalars['Int']['output']>;
};

/** order by sum() on columns of table "users" */
export type Users_Sum_Order_By = {
  family_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  user_detail_id?: InputMaybe<Order_By>;
};

/** update columns of table "users" */
export enum Users_Update_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Email = 'email',
  /** column name */
  FamilyId = 'family_id',
  /** column name */
  Id = 'id',
  /** column name */
  Password = 'password',
  /** column name */
  RefreshToken = 'refresh_token',
  /** column name */
  Role = 'role',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  UserDetailId = 'user_detail_id'
}

export type Users_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Users_Inc_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Users_Set_Input>;
  /** filter the rows which have to be updated */
  where: Users_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Users_Var_Pop_Fields = {
  __typename?: 'users_var_pop_fields';
  family_id?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  user_detail_id?: Maybe<Scalars['Float']['output']>;
};

/** order by var_pop() on columns of table "users" */
export type Users_Var_Pop_Order_By = {
  family_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  user_detail_id?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Users_Var_Samp_Fields = {
  __typename?: 'users_var_samp_fields';
  family_id?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  user_detail_id?: Maybe<Scalars['Float']['output']>;
};

/** order by var_samp() on columns of table "users" */
export type Users_Var_Samp_Order_By = {
  family_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  user_detail_id?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Users_Variance_Fields = {
  __typename?: 'users_variance_fields';
  family_id?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  user_detail_id?: Maybe<Scalars['Float']['output']>;
};

/** order by variance() on columns of table "users" */
export type Users_Variance_Order_By = {
  family_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  user_detail_id?: InputMaybe<Order_By>;
};

export type UserRegisterMutationVariables = Exact<{
  input: UserRegisterInput;
}>;


export type UserRegisterMutation = { __typename?: 'mutation_root', userRegister?: { __typename?: 'UserRegisterOutput', timestamp?: string | null, statusCode?: number | null, errorMessage?: string | null, errorCode?: string | null, data?: { __typename?: 'UserRegisterOutputData', birthday?: any | null, createdAt?: any | null, email?: string | null, familyId?: number | null, id?: number | null, name?: string | null, refreshToken?: string | null, role?: string | null } | null } | null };


export const UserRegisterDocument = gql`
    mutation UserRegister($input: UserRegisterInput!) {
  userRegister(input: $input) {
    timestamp
    statusCode
    errorMessage
    errorCode
    data {
      birthday
      createdAt
      email
      familyId
      id
      name
      refreshToken
      role
    }
  }
}
    `;
export type UserRegisterMutationFn = Apollo.MutationFunction<UserRegisterMutation, UserRegisterMutationVariables>;

/**
 * __useUserRegisterMutation__
 *
 * To run a mutation, you first call `useUserRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUserRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [userRegisterMutation, { data, loading, error }] = useUserRegisterMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUserRegisterMutation(baseOptions?: Apollo.MutationHookOptions<UserRegisterMutation, UserRegisterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UserRegisterMutation, UserRegisterMutationVariables>(UserRegisterDocument, options);
      }
export type UserRegisterMutationHookResult = ReturnType<typeof useUserRegisterMutation>;
export type UserRegisterMutationResult = Apollo.MutationResult<UserRegisterMutation>;
export type UserRegisterMutationOptions = Apollo.BaseMutationOptions<UserRegisterMutation, UserRegisterMutationVariables>;